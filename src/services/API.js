import axios from "axios";
import {API_BASE_URI} from "@/services/services";

const API = axios.create({
    baseURL: API_BASE_URI
});
export default API;
