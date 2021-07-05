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
    async login(email, password) {
        try {
            const res = await API.get(`/user`, {
                params: {
                    email,
                    password
                }
            });
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
            const res = await API.get(`/restore-password`, {
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
    async changePassword(email, password) {
        try {
            const res = await API.put(`/reset-password`, {
                email,
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
    async uploadProfilePicture(email, pictureData) {
        try {
            const requestData = new FormData();
            requestData.append("name", email + "-profile");
            requestData.append("file", pictureData);
            const res = await API.post(`/change-profile-image`, requestData, {
                header: {
                    "Content-Type": "image/png"
                }
            });
            const {error, data} = res.data;
            console.log(res);
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
