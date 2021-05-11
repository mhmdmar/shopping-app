import config from "../../../config/config.js";

export const BASE_URI = `http://${config.HOST}:${config.PORT}`;
export const API_BASE_URI = BASE_URI + "/api";
