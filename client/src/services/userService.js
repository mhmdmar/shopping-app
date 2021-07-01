import API from "@/services/API.js";

export const userService = {
    async getAccounts() {
        try {
            let res = await API.get(`/users`);
            const {error, users} = res.data;
            return {
                users,
                error
            };
        } catch (error) {
            return {
                error
            };
        }
    },
    async login(username, password) {
        try {
            const res = await API.get(
                `/user?email=${username}&password=${password}`
            );
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
        } catch (error) {
            return {
                error
            };
        }
    },
    async registerAccount(email, username, password) {
        try {
            const res = await API.post(`/user`, {
                email,
                username,
                password
            });
            const {error, data} = res.data;
            return {
                data,
                error
            };
        } catch (error) {
            return {
                error
            };
        }
    },
    async restorePassword(email) {
        try {
            const res = await API.get(`/restore_password`, {
                params: {
                    email
                }
            });
            const {error, data} = res.data;
            return {
                data,
                error
            };
        } catch (error) {
            return {
                error
            };
        }
    },
    async changePassword(email, newPassword) {
        try {
            const res = await API.put(`/user`, {
                params: {
                    email,
                    password: newPassword
                }
            });
            const {error, data} = res.data;
            return {
                data,
                error
            };
        } catch (error) {
            return {
                error
            };
        }
    }
};
