import {host} from "@/services/server.json";
import axios from "axios";

function getServerAddressEndPoint(endpoint) {
    return `${host}/${endpoint}`;
}
export const userService = {
    async getAccounts() {
        let res = await axios.get(getServerAddressEndPoint("api/users"));
        console.log(res);
    },
    async getAccount(username, password) {
        let res = await axios.get(
            getServerAddressEndPoint(
                `api/user?username=${username}&password=${password}`
            )
        );
        return res.data;
    }
};
