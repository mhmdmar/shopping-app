import API from "@/services/API.js";

export const userService = {
    async getAccounts() {
        let res = await API.get(`/users`);
        const {error, users} = res.data;
        return {
            users,
            error
        };
    },
    async login(username, password) {
        let res = await API.get(`/user?email=${username}&password=${password}`);
        const {error, data} = res.data;
        let user = null,
            token = null,
            cart = null;
        if (data) {
            user = data.user;
            token = data.token;
            cart = data.cart;
        }
        return {
            token,
            user,
            cart,
            error
        };
    },
    async registerAccount(email, username, password) {
        const res = await API.post(`/user`, {
            email,
            username,
            password
        });
        const {error, data} = res.data;
        let user = null,
            token = null;
        if (data) {
            user = data.user;
            token = data.token;
        }
        return {
            token,
            user,
            error
        };
    }
};
