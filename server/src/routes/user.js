import dbHelper from "../database/dbHelper.js";
import {StatusCodes} from "http-status-codes";
import {createToken, validateToken} from "../utils/jsonTokenHandler.js";
export default router => {
    router.get(`/api/users`, (req, res) => {
        dbHelper.getUsers().then(users => {
            res.send(users);
        });
    });
    router.get(`/api/user`, (req, res) => {
        const {email, password} = req.query;
        if (!email || !password) {
            res.send({
                error: "invalid email and/or password"
            });
        } else {
            dbHelper
                .getUser(email, password)
                .then(user => {
                    if (user) {
                        const token = createToken(user);
                        res.send({token, user});
                    } else {
                        res.status(StatusCodes.UNAUTHORIZED);
                        res.send({
                            error: "invalid email and/or password"
                        });
                    }
                })
                .catch(error => {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
                    res.send({error});
                });
        }
    });

    router.get(`/api/restore-session`, (req, res) => {
        const {token} = req.query;
        if (token) {
            validateToken(token, (err, user) => {
                const {email} = user;
                if (email) {
                    dbHelper.getUserByEmail(email).then(user => {
                        res.send({user});
                    });
                }
            });
        }
    });
    router.post(`/api/register`, async (req, res) => {
        const {email, username, password} = req.body;
        dbHelper
            .addUser(email, username, password)
            .then(user => {
                const token = createToken(user);
                res.send({user, token});
            })
            .catch(error => {
                res.send({error});
            });
    });
    return router;
};
