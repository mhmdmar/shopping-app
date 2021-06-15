import dbHelper from "../database/dbHelper.js";
import {message} from "../utils/constants.js";
import {
    addProductImageFullPath,
    addProductsImageFullPath
} from "../utils/strings.js";
import {Response} from "./shared.js";

export default router => {
    router.get(`/api/products`, (req, res) => {
        const {productId} = req.query;
        dbHelper
            .getProducts(productId)
            .then(products => {
                res.send(
                    new Response(
                        addProductsImageFullPath(req, [
                            ...products,
                            ...products,
                            ...products,
                            ...products,
                            ...products
                        ]),
                        null
                    )
                );
            })
            .catch(error => {
                res.send(new Response(null, error));
            });
    });
    router.get(`/api/product`, (req, res) => {
        const {id} = req.query;
        dbHelper
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
