import axios from "axios";
import {API_BASE_URI} from "@/services/services";
import store from "@/store";

const encode = val => {
    return encodeURIComponent(val)
        .replace(/%3A/gi, ":")
        .replace(/%24/g, "$")
        .replace(/%2C/gi, ",")
        .replace(/%20/g, "+")
        .replace(/%5B/gi, "[")
        .replace(/%5D/gi, "]");
};

const API = axios.create({
    baseURL: API_BASE_URI,
    paramsSerializer: params => {
        const parts = [];

        const convertPart = (key, val) => {
            if (val instanceof Date) {
                val = val.toISOString();
            } else if (val instanceof Object) {
                val = JSON.stringify(val);
            }
            parts.push(encode(key) + "=" + encode(val));
        };

        Object.entries(params).forEach(([key, val]) => {
            if (val === null || typeof val === "undefined") {
                return;
            }

            if (Array.isArray(val)) {
                val.forEach(v => convertPart(`${key}`, v));
            } else {
                convertPart(key, val);
            }
        });
        return parts.join("&");
    }
});

API.defaults.headers.common[
    "authorization"
] = `Bearer ${store.getters.userToken}`;
export default API;
