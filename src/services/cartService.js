import {API_BASE_URI} from "@/services/services.js";
import API from "@/services/API";

export const cartService = {
    async getCart() {
        let res = await API.get(`${API_BASE_URI}/cart`);
        const {error, cart} = res.data;
        let success = true;
        if (res.status !== 200) {
            success = false;
        }
        return {
            success,
            cart,
            error
        };
    },
    async addToCart(email, password, productId, quantity) {
        let res = await API.post(`${API_BASE_URI}/cart`, {
            email,
            password,
            productId,
            quantity
        });
        let success = false;
        const {error} = res.data;
        if (res.status === 201) {
            success = true;
        }
        return {
            success,
            error
        };
    }
};
