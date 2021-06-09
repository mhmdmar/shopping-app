import mockData from "./mockData.js";
import dbConfig from "./config.js";
const {products, users} = mockData;
import pg from "pg";
const {Client} = pg;
const UNKNOWN_DATABASE_ERROR = "database error, ops...";
const INVALID_USERNAME_PASSWORD = "invalid email and/or password";
const DEFAULT_USER_PROFILE_PICTURE = "/images/img_avatar.png";
class DBHelper {
    constructor() {
        this.client = new Client(dbConfig);
    }

    connect() {
        this.client.connect();
    }
    async close() {
        this.client.close();
    }

    async query(queryString, singleResult) {
        return new Promise((resolve, reject) => {
            this.client
                .query(queryString)
                .then(payload => {
                    const {rows} = payload;
                    resolve(
                        rows.length > 0 ? (singleResult ? rows[0] : rows) : null
                    );
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    async getUsers() {
        return new Promise((resolve, reject) => {
            const queryString = `SELECT email, username, password, "profilePicture" FROM public."Users";`;
            this.query(queryString)
                .then(resolve)
                .catch(() => {
                    reject(UNKNOWN_DATABASE_ERROR);
                });
        });
    }

    async getUser(email, password) {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT email, username, "profilePicture" FROM public."Users" WHERE email = '${email}' AND password = '${password}';`;
            this.query(queryString, true)
                .then(userData => {
                    if (userData !== null) {
                        queryString = `SELECT "productId","quantity" FROM "Carts" INNER JOIN "CartItems" ON "Carts"."cartId" = "CartItems"."cartId"
                                        WHERE "userId" ='${email}' AND "checkedOut" = false;`;
                        this.query(queryString)
                            .then(items => {
                                resolve({
                                    email: userData.email,
                                    username: userData.username,
                                    cart: {
                                        items
                                    }
                                });
                            })
                            .catch(() => reject(UNKNOWN_DATABASE_ERROR));
                    } else {
                        resolve(null);
                    }
                })
                .catch(() => {
                    reject(UNKNOWN_DATABASE_ERROR);
                });
        });
    }

    async addUser(email, username, password) {
        return new Promise((resolve, reject) => {
            const queryString = `INSERT INTO public."Users" ("email","username","password","profilePicture")
                            VALUES ('${email}','${username}','${password}','${DEFAULT_USER_PROFILE_PICTURE}')`;
            this.query(queryString)
                .then(() => {
                    resolve({
                        email,
                        username,
                        cart: {
                            items: []
                        },
                        profilePicture: DEFAULT_USER_PROFILE_PICTURE
                    });
                })
                .catch(err => {
                    if (err.code === "23505") {
                        reject(`email already exists`);
                    } else {
                        reject(UNKNOWN_DATABASE_ERROR);
                    }
                });
        });
    }

    async getProducts(productId) {
        return new Promise(async (resolve, reject) => {
            let queryString;
            if (!productId) {
                queryString = `SELECT *FROM public."Products";`;
            } else {
                let productIds;
                if (Array.isArray(productId)) {
                    productIds = productId;
                } else {
                    productIds = [productId];
                }
                queryString = `SELECT * FROM public."Products" WHERE id IN ('${productIds.join(
                    "','"
                )}');`;
            }
            this.query(queryString)
                .then(resolve)
                .catch(() => {
                    reject(UNKNOWN_DATABASE_ERROR);
                });
        });
    }

    async getProduct(id) {
        return new Promise((resolve, reject) => {
            const queryString = `SELECT * FROM public."Products" WHERE id = '${id}'`;
            this.query(queryString, true)
                .then(resolve)
                .catch(() => {
                    reject(UNKNOWN_DATABASE_ERROR);
                });
        });
    }

    async getCart(email) {
        return new Promise(async (resolve, reject) => {
            let queryString = `SELECT "productId","quantity" FROM "Carts" INNER JOIN "CartItems" ON "Carts"."cartId" = "CartItems"."cartId"
                                        WHERE "userId" ='${email}' AND "checkedOut" = false;`;
            this.query(queryString)
                .then(resolve)
                .catch(() => {
                    reject(UNKNOWN_DATABASE_ERROR);
                });
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
            const index = user.cart.items.findIndex(_item => _item.id === id);
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
const dbHelper = new DBHelper();
export default dbHelper;
