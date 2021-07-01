import dbHelper from "../database/dbHelper.js";
import {StatusCodes} from "http-status-codes";
import {createToken /*,validateToken*/} from "../utils/jsonTokenHandler.js";
import {addUserImageFullPath} from "../utils/strings.js";
import {Response} from "./shared.js";
import {message} from "../utils/constants.js";
import {sendPasswordToUser} from "../utils/Mailer/mailer.js";
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
            .then(() => {
                res.send(new Response(message.success.ADDED, null));
            })
            .catch(error => {
                res.send(new Response(null, error));
            });
    });

    router.get(`/api/restore_password`, async (req, res) => {
        const {email} = req.query;
        if (!email) {
            res.send(
                new Response(null, message.error.MISSING_EMAIL_FROM_Query)
            );
        } else {
            dbHelper
                .getPasswordByEmail(email)
                .then(password => {
                    if (password) {
                        sendPasswordToUser(email, password)
                            .then(() => {
                                res.send(
                                    new Response(
                                        message.success.RESTORE_PASSWORD,
                                        null
                                    )
                                );
                            })
                            .catch(err => {
                                res.send(new Response(null, err));
                            });
                    } else {
                        res.send(
                            new Response(
                                null,
                                message.error.EMAIL_DOESNT_EXISTS
                            )
                        );
                    }
                })
                .catch(error => {
                    res.send(new Response(null, error));
                });
        }
    });
    router.put(`/api/user`, async (req, res) => {
        res.send(new Response(null, "NOT IMPLEMENTED YET"));
    });
    return router;
};
