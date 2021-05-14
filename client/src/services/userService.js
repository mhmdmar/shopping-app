import API from "@/services/API.js";

export const userService = {
    async getAccounts() {
        let res = await API.get(`/users`);
        const {error, users} = res.data;
        let success = true;
        if (res.status !== 200) {
            success = false;
        }
        return {
            success,
            users,
            error
        };
    },
    async getAccount(username, password, isPasswordEncrypted = false) {
        let res = await API.get(
            `/user?email=${username}&password=${password}&isPasswordEncrypted=${isPasswordEncrypted}`
        );
        const {error, user} = res.data;
        let success = true;
        if (res.status !== 200) {
            success = false;
        }
        if (user === undefined) {
            success = false;
        }
        return {
            success,
            user,
            error: error || "something went wrong, try again later :("
        };
    },
    async registerAccount(email, username, password) {
        let res = await API.post(`/register`, {
            email,
            username,
            password
        });
        let success = false;
        let {user, error} = res.data;
        if (res.status === 201) {
            success = true;
        }
        return {
            success,
            user,
            error
        };
    }
};
