import dbHelper from "../database/dbHelper.js";

export default router => {
    router.get(`/api/cart`, (req, res) => {
        const {email, password} = req.query;
        dbHelper
            .getCart(email, password)
            .then(items => {
                res.send(items);
            })
            .catch(error => {
                res.send({
                    error
                });
            });
    });
    router.post(`/api/cart`, (req, res) => {
        res.send({message: "added successfully"});
    });
};
