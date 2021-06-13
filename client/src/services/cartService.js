import API from "@/services/API";

export const cartService = {
    async getCartItems(cartId) {
        const res = await API.get(`/cart`, {
            cartId
        });
        const {error, data} = res.data;
        return error ? null : data;
    },
    async addToCart(productId, cartId, quantity) {
        const {error, data} = await API.post(`/cart`, {
            productId,
            quantity,
            cartId
        });
        return {
            data,
            error
        };
    },
    async updateCartItem(productId, cartId, quantity) {
        const {error, data} = await API.put(`/cart`, {
            productId,
            quantity,
            cartId
        });
        return {
            data,
            error
        };
    }
};
