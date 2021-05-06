import API from "@/services/API";
export const productsService = {
    async getProducts(productsId = []) {
        if (!Array.isArray(productsId)) {
            throw new Error("productsId must be a valid array");
        }
        let requestUrl = `/products`;
        if (productsId.length > 0) {
            requestUrl += "?" + productsId.map(i => "id=" + i).join("&");
        }
        let res = await API.get(requestUrl);
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    },
    async getProduct(productId) {
        let res = await API.get(`/product?id=${productId}`);
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    }
};
