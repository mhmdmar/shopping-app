import mockData from "./mockData.js";

const {products, users} = mockData;
class DBHelper {
    constructor() {}
    async getUsers() {
        return new Promise(resolve => {
            resolve(users);
        });
    }
    async getUserByEmail(email) {
        return new Promise(async resolve => {
            const user = users.find(user => {
                return user.email === email;
            });
            resolve({
                email: user.email,
                username: user.username,
                cart: user.cart
            });
        });
    }
    async getUser(email, password) {
        return new Promise(async resolve => {
            const user = users.find(user => {
                return user.email === email && user.password === password;
            });
            resolve({
                email: user.email,
                username: user.username,
                cart: user.cart
            });
        });
    }
    async addUser(email, username, password) {
        return new Promise(async resolve => {
            if (users.some(user => user.email === email)) {
                resolve({
                    error: "email already taken"
                });
            } else {
                users.push({
                    email,
                    username,
                    password,
                    profilePicture: `/images/logo.png`,
                    cart: {items: []}
                });
            }
        });
    }
    async getProducts(id) {
        return new Promise(resolve => {
            let result;
            if (!id) {
                result = products;
            } else if (Array.isArray(id)) {
                result = products.filter(product => id.includes(product.id));
            } else {
                result = products.find(product => product.id === id);
            }
            resolve(result);
        });
    }
    async getProduct(id) {
        return new Promise(resolve => {
            const product = products.find(product => product.id === id);
            resolve(product);
        });
    }
    async getCart(email) {
        return new Promise(resolve => {
            const user = users.find(user => user.email === email);
            if (!user) {
                resolve({
                    error: "user doesn't exist, if it was deleted by accident please contact support!"
                });
            }
            const items = user.cart?.items?.map(curItem => {
                const product = products.find(item => item.id === curItem.id);
                return {...product, quantity: curItem.quantity};
            });
            resolve({items});
        });
    }
    async addProduct(email, id, quantity = 1) {
        if (isNaN(quantity)) {
            quantity = 1;
        } else if (typeof quantity !== "number") {
            quantity = Number(quantity);
        }
        return new Promise(resolve => {
            const user = users.find(user => user.email === email);
            const index = user.cart.items.findIndex(
                _item => _item.id === id
            );
            if (index > -1) {
                user.cart.items[index].quantity += quantity;
            } else {
                user.cart.items.push({
                    id,
                    quantity
                });
            }
            resolve();
        });
    }
}

export default new DBHelper();
