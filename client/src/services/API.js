import axios from "axios";
import {API_BASE_URI} from "@/services/services";
import store from "@/store";
const API = axios.create({
    baseURL: API_BASE_URI
});
API.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
API.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
API.defaults.headers.common[
    "authorization"
] = `Bearer ${store.getters.userToken}`;
export default API;
