import express from "express";
import addUserRoutes from "./user.js";
import addProductsRoutes from "./products.js";
import addCartRoutes from "./cart.js";
import {Response} from "./shared.js";
import {message} from "../utils/constants.js";

const router = express.Router();

export default function initRoutes() {
    addUserRoutes(router);
    addProductsRoutes(router);
    addCartRoutes(router);

    router.get("/api/test", (req, res) => {
        res.send("TEST");
    });
    router.all("/api/*", (req, res) => {
        res.send(new Response(null, message.error.INVALID_END_POINT));
    });
    return router;
}
