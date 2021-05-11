const {users} = require("./mockData");
module.exports = router => {
    router.get(`/api/cart`, (req, res) => {
        res.send(users[0].cart);
    });
    router.post(`/api/cart`, (req, res) => {
        res.send({message: "added successfully"});
    });
};
