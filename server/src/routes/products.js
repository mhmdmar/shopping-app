const {products} = require("./mockData.js");

module.exports = router => {
    router.get(`/api/products`, (req, res) => {
        res.send(products);
        /* const queryParams = extractQuery(request.url);
        if (queryParams === null) {
            return products;
        }
        const {id} = queryParams;
        if (Array.isArray(id)) {
            return products.filter(product => id.includes(product.id));
        }
        const product = products.find(product => product.id === id);
        if (product) {
            return [product];
        }
        return null;*/
    });
    router.get(`/api/product`, (req, res) => {
        res.send(products[0]);
        /*const {id} = request.queryParams;
        const product = products.find(product => product.id === id);
        if (!product) {
            return {
                error: "product doesn't exists"
            };
        }
        return product;*/
    });
    return router;
};
