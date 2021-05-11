const {users} = require("./mockData.js");

module.exports = router => {
    router.get(`/api/users`, (req, res) => {
        res.send(users);
    });
    router.get(`/api/users`, (req, res) => {
        res.send(users);
    });
    router.get(`/api/user`, (req, res) => {
        res.send({
            user: users[0]
        });
    });
    router.post(`/api/register`, (req, res) => {
        res.send({
            message: "registered"
        });
    });
    return router;
};
/*

module.exports = router => {
    router.get(`users`, (req, res) => {
        res.send(users);
    });
    router.get(`api/users`, (req, res) => {
        res.send(users);
    });
    router.get(`api/user`, (req, res) => {
        res.send(users[0]);
    });
    router.post(`api/register`, (req, res) => {
        res.send({
            message: "registered"
        });
    });
    return router;
};
*/
