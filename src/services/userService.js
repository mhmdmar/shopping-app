import {API_BASE_URI, BASE_URI} from "@/services/services.js";
import axios from "axios";

export const userService = {
    async getAccounts() {
        let res = await axios.get(BASE_URI + "/users");
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
    async getAccount(username, password) {
        let res = await axios.get(
            `${API_BASE_URI}/user?email=${username}&password=${password}`
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
            error: error || "invalid email/password"
        };
    },
    async registerAccount(email, username, password) {
        let res = await axios.post(`${API_BASE_URI}/register`, {
            email,
            username,
            password,
            profilePicture: `${BASE_URI}/images/img_avatar.png`,
            registrationDate: Date.now()
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
