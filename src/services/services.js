import {userService} from "@/services/userService.js";
export const services = {
    userService
};

export const BASE_URI = process.env.VUE_APP_BASE_URI;
export const API_BASE_URI = BASE_URI + "/api";
