import dbHelper from "../database/dbHelper.js";
import {message} from "../utils/constants.js";

export default router => {
    router.get(`/api/products`, (req, res) => {
        const {id} = req.query;
        dbHelper
            .getProducts(id)
            .then(products => {
                res.send({items: products});
            })
            .catch(error => {
                res.send({error});
            });
    });
    router.get(`/api/product`, (req, res) => {
        const {id} = req.query;
        dbHelper
            .getProduct(id)
            .then(product => {
                if (product) {
                    res.send(product);
                } else {
                    res.send({
                        error: message.error.PRODUCT_DOESNT_EXISTS
                    });
                }
            })
            .catch(error => {
                res.send({
                    error
                });
            });
    });
    return router;
};
