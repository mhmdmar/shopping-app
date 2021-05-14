import API from "@/services/API";

export const productsService = {
    async getProducts() {
        let res = await API.get(`/products`);
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
