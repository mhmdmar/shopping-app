import API from "@/services/API";
import store from "@/store";
const user = store.getters.user;
export const cartService = {
    async getCart() {
        if (!user) {
            return {
                error: "user must be signed in"
            };
        }
        const {email, password} = user;
        const res = await API.get(`/cart?email=${email}&password=${password}`);
        const {error, items} = res.data;
        let success = true;
        if (res.status !== 200) {
            success = false;
        }
        return {
            success,
            items,
            error
        };
    },
    async addToCart(email, password, productId, quantity) {
        let res = await API.post(`/cart`, {
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
