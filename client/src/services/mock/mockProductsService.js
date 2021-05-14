import {products} from "@/services/mock/mockData";
import {extractQuery} from "@/services/mock/shared";

export default function productsRoutes() {
    this.get(`${this.config.baseURL}/products`, (schema, request) => {
        const queryParams = extractQuery(request.url);
        if (queryParams === null) {
            return products;
        }
        const {id} = queryParams;
        if (Array.isArray(id)) {
            return products.filter(product => id.includes(product.id));
        }
        const product = products.find(product => product.id === id);
        if (product) {
            return [product];
        }
        return null;
    });
    this.get(`${this.config.baseURL}/product`, (schema, request) => {
        const {id} = request.queryParams;
        const product = products.find(product => product.id === id);
        if (!product) {
            return {
                error: "product doesn't exists"
            };
        }
        return product;
    });
}
