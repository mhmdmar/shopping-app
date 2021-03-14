import {BASE_URI} from "@/services/services.js";
import axios from "axios";

export const productsService = {
    async getProducts() {
        const response = await axios.get(BASE_URI + "/products");
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
        }
    },
    async getProduct(productId) {
        let res = await axios.get(`${BASE_URI}/product?id=${productId}`);
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    }
};
