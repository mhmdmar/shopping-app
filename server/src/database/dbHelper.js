import dbConfig from "./config.js";
import pg from "pg";
const {Client} = pg;
import {message} from "../utils/constants.js";
import {validateNumber} from "../utils/strings.js";
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
        return new Promise(async (resolve, reject) => {
            try {
                const {rows} = await this.client.query(queryString);
                resolve(
                    rows.length > 0 ? (singleResult ? rows[0] : rows) : null
                );
            } catch (err) {
                reject(err);
            }
        });
    }
    getUsers() {
        return new Promise(async (resolve, reject) => {
            const queryString = `SELECT email, username, password, "profilePicture" FROM public."Users";`;
            try {
                resolve(await this.query(queryString));
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }

    getUser(email, password) {
        return new Promise(async (resolve, reject) => {
            let queryString = `SELECT email, username, "profilePicture" FROM public."Users" WHERE email = '${email}' AND password = '${password}';`;
            try {
                const userData = await this.query(queryString, true);
                if (userData !== null) {
                    queryString = `SELECT "Carts"."cartId", "productId","quantity" FROM "Carts" INNER JOIN "CartItems" ON "Carts"."cartId" = "CartItems"."cartId"
                                        WHERE "userId" ='${email}' AND "checkedOut" = false;`;
                    let items = await this.query(queryString);
                    let cartId;
                    if (!items) {
                        // TODO createNewEmptyCart() and assign id to it;
                        // cartId = newCartId
                    } else {
                        // TODO validate only one checkedOutCart exists (cartId is unique in the array)
                        cartId = items[0]?.cartId;
                        items = items.map(({quantity, productId}) => {
                            return {quantity, productId};
                        });
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
                } else {
                    resolve(null);
                }
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }

    addUser(email, username, password) {
        return new Promise(async (resolve, reject) => {
            const queryString = `INSERT INTO public."Users" ("email","username","password","profilePicture")
                            VALUES ('${email}','${username}','${password}','${DEFAULT_USER_PROFILE_PICTURE}')`;
            try {
                await this.query(queryString);
                resolve({
                    email,
                    username,
                    cart: {
                        items: []
                    },
                    profilePicture: DEFAULT_USER_PROFILE_PICTURE
                });
            } catch (err) {
                if (err.code === "23505") {
                    reject(`email already exists`);
                } else {
                    reject(message.error.UNKNOWN_DATABASE_ERROR);
                }
            }
        });
    }

    getProducts(productId) {
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
            try {
                resolve(await this.query(queryString));
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }

    getProduct(id) {
        return new Promise(async (resolve, reject) => {
            const queryString = `SELECT * FROM public."Products" WHERE id = '${id}'`;
            try {
                resolve(await this.query(queryString, true));
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }
    _getCartProduct(cartId, productId) {
        return new Promise(async (resolve, reject) => {
            const queryString = `SELECT "cartId", "productId", "quantity" FROM public."CartItems" 
                                    WHERE "cartId" = '${cartId}' AND "productId" = '${productId}'`;
            try {
                resolve(await this.query(queryString, true));
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }
    getCart(email) {
        return new Promise(async (resolve, reject) => {
            const queryString = `SELECT "productId","quantity" FROM "Carts" INNER JOIN "CartItems" ON "Carts"."cartId" = "CartItems"."cartId"
                                        WHERE "userId" ='${email}' AND "checkedOut" = false;`;
            try {
                resolve(await this.query(queryString));
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }
    _removeCartProduct(cartId, productId) {
        return new Promise(async (resolve, reject) => {
            const queryString = `DELETE from public."CartItems" WHERE "cartId" = '${cartId}' AND "productId" = '${productId}'`;
            try {
                resolve(await this.query(queryString));
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }
    _updateCartProduct(cartId, productId, quantity) {
        return new Promise(async (resolve, reject) => {
            const queryString = `UPDATE public."CartItems" SET quantity= ${quantity} WHERE "cartId" = '${cartId}' AND "productId" = '${productId}'`;
            try {
                resolve(await this.query(queryString));
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }

    _insertProductToCart(cartId, productId, quantity) {
        return new Promise(async (resolve, reject) => {
            const queryString = `INSERT INTO public."CartItems"("cartId", "productId", "quantity")VALUES (${cartId}, ${productId}, ${quantity})`;
            try {
                resolve(await this.query(queryString));
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }

    addProductToCart(email, cartId, productId, quantity = 1) {
        return new Promise(async (resolve, reject) => {
            quantity = validateNumber(quantity);
            try {
                const data = await this._getCartProduct(cartId, productId);
                if (data) {
                    resolve(
                        await this._updateCartProduct(
                            cartId,
                            productId,
                            data.quantity + quantity
                        )
                    );
                } else {
                    resolve(
                        await this._insertProductToCart(
                            cartId,
                            productId,
                            quantity
                        )
                    );
                }
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }

    updateProductToCart(email, cartId, productId, quantity) {
        return new Promise(async (resolve, reject) => {
            if (!quantity) {
                reject(message.error.INVALID_REQUEST_BODY);
            }
            quantity = validateNumber(quantity);
            try {
                const data = await this._getCartProduct(cartId, productId);
                if (data) {
                    if (quantity === 0) {
                        resolve(
                            await this._removeCartProduct(
                                cartId,
                                productId,
                                quantity
                            )
                        );
                    } else {
                        resolve(
                            await this._updateCartProduct(
                                cartId,
                                productId,
                                quantity
                            )
                        );
                    }
                } else {
                    reject(message.error.UPDATE_INVALID_ITEM);
                }
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }
}
const dbHelper = new DBHelper();
export default dbHelper;
