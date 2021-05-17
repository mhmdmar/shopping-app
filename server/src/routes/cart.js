import dbHelper from "../database/dbHelper.js";
import authenticateJWT from "../middleware/authentication.js";

export default router => {
    router.get(`/api/cart`, authenticateJWT, (req, res) => {
        const {userEmail} = req;
        dbHelper
            .getCart(userEmail)
            .then(items => {
                res.send(items);
            })
            .catch(error => {
                res.send({
                    error
                });
            });
    });
    router.post(`/api/cart`, authenticateJWT, (req, res) => {
        const {userEmail} = req;
        const {id, quantity} = req.body;
        if (id) {
            dbHelper.addProduct(userEmail, id, quantity).then(() => {
                res.send({message: "added successfully"});
            });
        } else {
            res.send({message: "invalid request body"});
        }
    });
};
