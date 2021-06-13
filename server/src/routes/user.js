import dbHelper from "../database/dbHelper.js";
import {StatusCodes} from "http-status-codes";
import {createToken /*,validateToken*/} from "../utils/jsonTokenHandler.js";
import {addUserImageFullPath} from "../utils/strings.js";
import {Response} from "./shared.js";
import {message} from "../utils/constants.js";
export default router => {
    router.get(`/api/users`, (req, res) => {
        dbHelper.getUsers().then(users => {
            res.send(new Response(users, null));
        });
    });

    router.get(`/api/user`, (req, res) => {
        const {email, password} = req.query;
        if (!email || !password) {
            res.send(new Response(null, message.error.INVALID_CREDENTIALS));
        } else {
            dbHelper
                .getUser(email, password)
                .then(userData => {
                    if (userData) {
                        const {user, cart} = userData;
                        addUserImageFullPath(req, user);
                        const token = createToken(user);
                        res.send(new Response({user, cart, token}, null));
                    } else {
                        res.send(
                            new Response(
                                null,
                                message.error.INVALID_CREDENTIALS
                            )
                        );
                    }
                })
                .catch(error => {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
                    new Response(null, error);
                });
        }
    });
    router.post(`/api/user`, async (req, res) => {
        const {email, username, password} = req.body;
        dbHelper
            .addUser(email, username, password)
            .then(user => {
                const token = createToken(user);
                res.send(new Response({user, token}, null));
            })
            .catch(error => {
                res.send(new Response(null, error));
            });
    });
    return router;
};
