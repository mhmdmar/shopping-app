import productsHelper from "../database/productsHelper.js";
import {message} from "../utils/constants.js";
import {
    addProductImageFullPath,
    addProductsImageFullPath
} from "../utils/strings.js";
import {Response} from "./shared.js";

export default router => {
    router.get(`/api/products`, (req, res) => {
        const {id} = req.query;
        productsHelper
            .getProducts(id)
            .then(products => {
                res.send(
                    new Response(addProductsImageFullPath(req, products), null)
                );
            })
            .catch(error => {
                res.send(new Response(null, error));
            });
    });
    router.get(`/api/product`, (req, res) => {
        const {id} = req.query;
        productsHelper
            .getProduct(id)
            .then(product => {
                if (product) {
                    res.send(
                        new Response(
                            addProductImageFullPath(req, product),
                            null
                        )
                    );
                } else {
                    res.send(
                        new Response(null, message.error.PRODUCT_DOESNT_EXISTS)
                    );
                }
            })
            .catch(error => {
                res.send(new Response(null, error));
            });
    });
    return router;
};
