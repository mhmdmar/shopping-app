import dbConfig from "./config.js";
import pg from "pg";
const {Client} = pg;
import {message} from "../utils/constants.js";
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

    query(queryString, singleResult) {
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
    getUsers() {
        return new Promise((resolve, reject) => {
            const queryString = `SELECT email, username, password, "profilePicture" FROM public."Users";`;
            this.query(queryString)
                .then(resolve)
                .catch(() => {
                    reject(message.error.UNKNOWN_DATABASE_ERROR);
                });
        });
    }

    getUser(email, password) {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT email, username, "profilePicture" FROM public."Users" WHERE email = '${email}' AND password = '${password}';`;
            this.query(queryString, true)
                .then(userData => {
                    if (userData !== null) {
                        queryString = `SELECT "Carts"."cartId", "productId","quantity" FROM "Carts" INNER JOIN "CartItems" ON "Carts"."cartId" = "CartItems"."cartId"
                                        WHERE "userId" ='${email}' AND "checkedOut" = false;`;
                        this.query(queryString)
                            .then(items => {
                                let cartId;
                                if (!items) {
                                    // TODO createNewEmptyCart() and assign id to it;
                                    // cartId = newCartId
                                } else {
                                    // TODO validate only one checkedOutCart exists (cartId is unique in the array)
                                    cartId = items[0]?.["cartId"];
                                    items = items.map(
                                        ({quantity, productId}) => {
                                            return {quantity, productId};
                                        }
                                    );
                                }
                                resolve({
                                    user: {
                                        email: userData.email,
                                        username: userData.username,
                                        profilePicture: userData.profilePicture
                                    },
                                    cart: {
                                        cartId,
                                        items
                                    }
                                });
                            })
                            .catch(() =>
                                reject(message.error.UNKNOWN_DATABASE_ERROR)
                            );
                    } else {
                        resolve(null);
                    }
                })
                .catch(() => {
                    reject(message.error.UNKNOWN_DATABASE_ERROR);
                });
        });
    }

    addUser(email, username, password) {
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
                        reject(message.error.UNKNOWN_DATABASE_ERROR);
                    }
                });
        });
    }

    getProducts(productId) {
        return new Promise((resolve, reject) => {
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
                    reject(message.error.UNKNOWN_DATABASE_ERROR);
                });
        });
    }

    getProduct(id) {
        return new Promise((resolve, reject) => {
            const queryString = `SELECT * FROM public."Products" WHERE id = '${id}'`;
            this.query(queryString, true)
                .then(resolve)
                .catch(() => {
                    reject(message.error.UNKNOWN_DATABASE_ERROR);
                });
        });
    }
    _getCartProduct(cartId, productId) {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT "cartId", "productId", "quantity" FROM public."CartItems" 
                                    WHERE "cartId" = '${cartId}' AND "productId" = '${productId}'`;
            this.query(queryString, true)
                .then(resolve)
                .catch(() => {
                    reject(message.error.UNKNOWN_DATABASE_ERROR);
                });
        });
    }
    getCart(email) {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT "productId","quantity" FROM "Carts" INNER JOIN "CartItems" ON "Carts"."cartId" = "CartItems"."cartId"
                                        WHERE "userId" ='${email}' AND "checkedOut" = false;`;
            this.query(queryString)
                .then(resolve)
                .catch(() => {
                    reject(message.error.UNKNOWN_DATABASE_ERROR);
                });
        });
    }
    _updateCartProduct(cartId, productId, quantity) {
        return new Promise((resolve, reject) => {
            let queryString = `UPDATE public."CartItems" SET quantity= ${quantity} WHERE "cartId" = '${cartId}' AND "productId" = '${productId}'`;
            this.query(queryString).then(resolve, reject);
        });
    }
    _insertProductToCart(cartId, productId, quantity) {
        return new Promise((resolve, reject) => {
            let queryString = `INSERT INTO public."CartItems"("cartId", "productId", "quantity")VALUES (${cartId}, ${productId}, ${quantity})`;
            this.query(queryString).then(resolve, reject);
        });
    }
    addProduct(email, cartId, productId, quantity = 1) {
        return new Promise((resolve, reject) => {
            if (isNaN(quantity)) {
                quantity = 1;
            } else if (typeof quantity !== "number") {
                quantity = Number(quantity);
            }
            this._getCartProduct(cartId, productId)
                .then(data => {
                    if (data) {
                        this._updateCartProduct(
                            cartId,
                            productId,
                            data.quantity + quantity
                        )
                            .then(resolve)
                            .catch(() => {
                                reject(message.error.UNKNOWN_DATABASE_ERROR);
                            });
                    } else {
                        this._insertProductToCart(cartId, productId, quantity)
                            .then(resolve)
                            .catch(() => {
                                reject(message.error.UNKNOWN_DATABASE_ERROR);
                            });
                    }
                })
                .catch(() => {
                    reject(message.error.UNKNOWN_DATABASE_ERROR);
                });
        });
    }
}
const dbHelper = new DBHelper();
export default dbHelper;
