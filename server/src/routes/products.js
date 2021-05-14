import dbHelper from "../database/dbHelper.js";

export default router => {
    router.get(`/api/products`, (req, res) => {
        const {id} = req.query;
        dbHelper
            .getProducts(id)
            .then(products => {
                res.send(products);
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
                        error: "product doesn't exists"
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
