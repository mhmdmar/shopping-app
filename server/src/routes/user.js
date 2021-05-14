import dbHelper from "../database/dbHelper.js";

export default router => {
    router.get(`/api/users`, (req, res) => {
        dbHelper.getUsers().then(users => {
            res.send(users);
        });
    });
    router.get(`/api/user`, (req, res) => {
        const {email, password, isPasswordEncrypted} = req.query;
        dbHelper
            .getUser(email, password, isPasswordEncrypted === "true")
            .then(user => {
                console.log(user);
                if (!user) {
                    res.send({
                        error: "invalid email and/or password"
                    });
                } else {
                    res.send({user});
                }
            })
            .catch(error => {
                res.send({error});
            });
    });
    router.post(`/api/register`, async (req, res) => {
        const {email, username, password} = req.body;
        dbHelper
            .addUser(email, username, password)
            .then(user => {
                res.send(user);
            })
            .catch(error => {
                res.send({error});
            });
    });
    return router;
};
