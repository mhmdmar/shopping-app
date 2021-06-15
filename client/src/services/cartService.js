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
        const res = await API.post(`/cart`, {
            productId,
            quantity,
            cartId
        });
        const {error, data} = res.data;
        if (error) {
            console.error(error);
        }
        return data;
    },
    async updateCartItem(productId, cartId, quantity) {
        const res = await API.put(`/cart`, {
            productId,
            quantity,
            cartId
        });
        const {error, data} = res.data;
        return {
            data,
            error
        };
    }
};
