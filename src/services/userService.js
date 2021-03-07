import {BASE_URI} from "@/services/services.js";
import axios from "axios";

export const userService = {
    async getAccounts() {
        return await axios.get(BASE_URI + "/users");
    },
    async getAccount(username, password) {
        let res = await axios.get(
            `${BASE_URI}/user?username=${username}&password=${password}`
        );
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    }
};
