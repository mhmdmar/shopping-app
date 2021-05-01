import {API_BASE_URI} from "@/services/services.js";
import axios from "axios";

export const productsService = {
    async getProducts(productsId = []) {
        if (!Array.isArray(productsId)) {
            throw new Error("productsId must be a valid array");
        }
        let requestUrl = `${API_BASE_URI}/products`;
        if (productsId.length > 0) {
            requestUrl += "?" + productsId.map(i => "id=" + i).join("&");
        }
        let res = await axios.get(requestUrl);
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    },
    async getProduct(productId) {
        let res = await axios.get(`${API_BASE_URI}/product?id=${productId}`);
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    }
};
