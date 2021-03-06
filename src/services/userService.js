import {host} from "@/services/server.json";
import axios from "axios";

function getServerAddressEndPoint(endpoint) {
    return `${host}/${endpoint}`;
}
export const userService = {
    async getAccounts() {
        return await axios.get(getServerAddressEndPoint("api/users"));
    },
    async getAccount(username, password) {
        let res = await axios.get(
            getServerAddressEndPoint(
                `api/user?username=${username}&password=${password}`
            )
        );
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    }
};
