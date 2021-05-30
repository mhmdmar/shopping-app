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
    async restoreSession(token) {
        let res = await API.get(`/restore-session?token=${token}`);
        const {error, user} = res.data;
        return {
            user,
            error
        };
    },
    async login(username, password) {
        let res = await API.get(`/user?email=${username}&password=${password}`);
        const {error, token, user} = res.data;
        return {
            token,
            user,
            error
        };
    },
    async registerAccount(email, username, password) {
        const res = await API.post(`/register`, {
            email,
            username,
            password
        });
        let {user, error, token} = res.data;
        return {
            user,
            token,
            error
        };
    }
};
