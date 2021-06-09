import express from "express";
import addUserRoutes from "./user.js";
import addProductsRoutes from "./products.js";
import addCartRoutes from "./cart.js";
import {message} from "../utils/constants.js";

const router = express.Router();

export default function initRoutes() {
    router.get("/", function (req, res) {
        try {
            res.sendFile("C:\\Projects\\shopping-app\\dist\\index.html");
        } catch (error) {
            res.json({
                success: false,
                message: message.error.UNKNOWN_ERROR
            });
        }
    });
    addUserRoutes(router);
    addProductsRoutes(router);
    addCartRoutes(router);
    return router;
}
