import mockData from "./mockData.js";
import {compareHashedText, hashText} from "../utils/encryption.js";

const {products, users} = mockData;
class DBHelper {
    constructor() {}
    async getUsers() {
        return new Promise(resolve => {
            resolve(users);
        });
    }
    async getUser(email, password, isPasswordEncrypted) {
        return new Promise(async resolve => {
            let user = null;
            for (let i = 0; i < users.length; i++) {
                const curUser = users[i];
                if (curUser.email === email) {
                    if (
                        isPasswordEncrypted &&
                        (await compareHashedText(curUser.password, password))
                    ) {
                        user = curUser;
                        break;
                    } else if (curUser.password === password) {
                        user = {...curUser, password: await hashText(password)};
                        break;
                    }
                }
            }
            resolve(user);
        });
    }
    async addUser(email, username, password) {
        return new Promise(async resolve => {
            const newUser = {
                email,
                username,
                password: await hashText(password)
            };
            if (users.some(user => user.email === newUser.email)) {
                resolve({
                    error: "email already taken"
                });
            } else {
                resolve({user: newUser});
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
    async getCart(email, password) {
        return new Promise(resolve => {
            const user = users.find(
                user => user.email === email && user.password === password
            );
            if (!user) {
                resolve({
                    error: "invalid email and/or password"
                });
            }
            const items = user.cart?.items?.map(curItem => {
                const product = products.find(item => item.id === curItem.id);
                return {...product, quantity: curItem.quantity};
            });
            resolve({items});
        });
    }
}

export default new DBHelper();
