import dbHelper from "../database/dbHelper.js";

export default router => {
    router.get(`/api/users`, (req, res) => {
        dbHelper.getUsers().then(users => {
            res.send(users);
        });
    });
    router.get(`/api/user`, (req, res) => {
        const {email, password} = req.query;
        dbHelper.getUser(email, password).then(user => {
            if (!user) {
                res.send({
                    error: "invalid email and/or password"
                });
            }
            res.send({user});
        });
    });
    router.post(`/api/register`, (req, res) => {
        res.send({
            message: "registered"
        });
    });
    return router;
};
