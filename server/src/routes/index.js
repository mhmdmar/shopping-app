const express = require("express");
const router = express.Router();
const addUserRoutes = require("./user.js");
const addProductsRoutes = require("./products.js");
const addCartRoutes = require("./cart.js");
function initRoutes() {
    router.get("/", function(req, res) {
        try {
            res.sendFile("C:\\Projects\\shopping-app\\dist\\index.html");
        } catch (error) {
            res.json({success: false, message: "Something went wrong"});
        }
    });
    addUserRoutes(router);
    addProductsRoutes(router);
    addCartRoutes(router);
    return router;
}

module.exports = initRoutes;
