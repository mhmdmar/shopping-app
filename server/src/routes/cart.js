import dbHelper from "../database/dbHelper.js";
import authenticateJWT from "../middleware/authentication.js";
import {Response} from "./shared.js";
import {message} from "../utils/constants.js";
import http from "http";
export default router => {
    router.get(`/api/cart`, authenticateJWT, (req, res) => {
        const {userEmail} = req;
        dbHelper
            .getCart(userEmail)
            .then(items => {
                res.send(new Response(items, null));
            })
            .catch(error => {
                res.send(new Response(null, error));
            });
    });
    router.post(`/api/cart`, authenticateJWT, (req, res) => {
        const {userEmail} = req;
        const {cartId, productId, quantity} = req.body;
        if (cartId && userEmail && productId) {
            dbHelper
                .addProduct(userEmail, cartId, productId, quantity)
                .then(() => {
                    res.send(new Response(message.success.added, null));
                })
                .catch(err => {
                    res.send(new Response(null, err));
                });
        } else {
            if (!userEmail) {
                res.sendStatus(401);
                res.send(new Response(null, message.error.UNAUTHORIZED));
            } else {
                res.send(
                    new Response(null, message.error.INVALID_REQUEST_BODY)
                );
            }
        }
    });
};
