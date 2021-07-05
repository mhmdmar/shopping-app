import dbHelper from "../database/dbHelper.js";
import {StatusCodes} from "http-status-codes";
import {createToken /*,validateToken*/} from "../utils/jsonTokenHandler.js";
import {addUserImageFullPath} from "../utils/strings.js";
import {Response} from "./shared.js";
import {message} from "../utils/constants.js";
import {sendPasswordToUser} from "../utils/Mailer/mailer.js";
import uploadSingleFile from "../middleware/imageUpload.js";

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

    router.put(`/api/reset-password`, async (req, res) => {
        const {email, password} = req.body;
        if (!email) {
            res.send(new Response(null, message.error.INVALID_REQUEST_BODY));
            return;
        }
        dbHelper
            .getPasswordByEmail(email)
            .then(oldPassword => {
                if (oldPassword) {
                    if (oldPassword === password) {
                        res.send(
                            new Response(
                                null,
                                message.error.PASSWORD_NEW_MATCH_OLD
                            )
                        );
                    } else {
                        dbHelper
                            .updateUserPassword(email, password)
                            .then(() => {
                                res.send(
                                    new Response(message.success.UPDATED, null)
                                );
                            })
                            .catch(error => {
                                res.send(new Response(null, error));
                            });
                    }
                } else {
                    res.send(
                        new Response(null, message.error.EMAIL_DOESNT_EXISTS)
                    );
                }
            })
            .catch(error => {
                res.send(new Response(null, error));
            });
    });

    router.get(`/api/restore-password`, async (req, res) => {
        const {email} = req.query;
        if (!email) {
            res.send(new Response(null, message.error.INVALID_REQUEST_BODY));
            return;
        }
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
                        .catch(error => {
                            res.send(new Response(null, error));
                        });
                } else {
                    res.send(
                        new Response(null, message.error.EMAIL_DOESNT_EXISTS)
                    );
                }
            })
            .catch(error => {
                res.send(new Response(null, error));
            });
    });
    router.post(
        `/api/change-profile-image`,
        uploadSingleFile,
        async (req, res) => {
            res.send({
                file: req.file
            });
        }
    );
    return router;
};
