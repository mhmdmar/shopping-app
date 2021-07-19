import dbHelper from "../database/dbHelper.js";
import authenticateJWT from "../middleware/authentication.js";
import {Response} from "./shared.js";
import {message} from "../utils/constants.js";
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
                .addProductToCart(userEmail, cartId, productId, quantity)
                .then(() => {
                    res.send(new Response(message.success.ADDED, null));
                })
                .catch(error => {
                    res.send(new Response(null, error));
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
    router.put(`/api/cart`, authenticateJWT, (req, res) => {
        const {userEmail} = req;
        const {cartId, productId, quantity} = req.body;
        if (cartId && userEmail && productId) {
            dbHelper
                .updateProductToCart(userEmail, cartId, productId, quantity)
                .then(() => {
                    res.send(new Response(message.success.UPDATED, null));
                })
                .catch(error => {
                    res.send(new Response(null, error));
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
