import API from "@/services/API";

export const cartService = {
    async getCart() {
        const res = await API.get(`/cart`);
        const {error, items} = res.data;
        return {
            items,
            error
        };
    },
    async addToCart(id, quantity) {
        const {error} = await API.post(`/cart`, {
            id,
            quantity
        });
        return {
            error
        };
    }
};
