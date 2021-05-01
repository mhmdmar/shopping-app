import {API_BASE_URI} from "@/services/services";
import {products} from "@/services/mock/mockData";
import {extractQuery} from "@/services/mock/shared";

export default function productsRoutes() {
    this.get(`${API_BASE_URI}/products`, (schema, request) => {
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
    this.get(`${API_BASE_URI}/product`, (schema, request) => {
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
