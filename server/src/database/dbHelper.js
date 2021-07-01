import dbConfig from "./config.js";
import pg from "pg";

const {Client} = pg;
import {message} from "../utils/constants.js";
import {validateNumber} from "../utils/strings.js";
import tablesSchemes from "./tablesSchemes.js";

const DEFAULT_USER_PROFILE_PICTURE = "/images/img_avatar.png";

class DBHelper {
    constructor() {
        this.client = new Client(dbConfig);
    }

    connect() {
        return new Promise(async (resolve, reject) => {
            try {
                this.client.connect();
                await this.initDatabase();
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    query(queryString, singleResult) {
        return new Promise(async (resolve, reject) => {
            try {
                const {rows} = await this.client.query(queryString);
                resolve(
                    rows?.length > 0 ? (singleResult ? rows[0] : rows) : null
                );
            } catch (err) {
                reject(err);
            }
        });
    }
    fillScheme(tableSpace, owner, tableName, columns) {
        return `CREATE TABLE IF NOT EXISTS ${tableName}(
            ${columns.join(",\n")}
         )
        TABLESPACE ${tableSpace};
        ALTER TABLE ${tableName}
        OWNER to ${owner};  
      `;
    }

    initDatabase() {
        const {owner, tableSpace, tables} = tablesSchemes;
        const promises = [];
        tables.forEach(table => {
            const query = this.fillScheme(
                tableSpace,
                owner,
                table.name,
                table.columns
            );
            promises.push(this.query(query));
        });
        return new Promise((resolve, reject) => {
            Promise.all(promises)
                .then(values => {
                    resolve(values);
                })
                .catch(err => {
                    reject(err);
                });
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

    getOpenedUserCartId(email) {
        // here we take into account that the user already exists and validated
        return new Promise(async (resolve, reject) => {
            const queryString = `SELECT "cartId" FROM public."Carts" WHERE "userId" ='${email}' AND "checkedOut" = false;`;
            try {
                const data = await this.query(queryString, true);
                resolve(data?.cartId || null);
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }
    getPasswordByEmail(email) {
        return new Promise(async (resolve, reject) => {
            const queryString = `SELECT password FROM public."Users" WHERE email = '${email}'`;
            try {
                const data = await this.query(queryString, true);
                resolve(data?.password || null);
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }
    getUser(email, password) {
        return new Promise(async (resolve, reject) => {
            const queryString = `SELECT email, username, "profilePicture" FROM public."Users" WHERE email = '${email}' AND password = '${password}';`;
            try {
                const userData = await this.query(queryString, true);
                if (userData !== null) {
                    let items = [];
                    let cartId = await this.getOpenedUserCartId(email);
                    if (!cartId) {
                        await this.query(
                            `INSERT INTO public."Carts"("userId", "dateCreated", "checkedOut") VALUES ( '${email}',  NOW(), false);`
                        );
                        cartId = await this.getOpenedUserCartId(email);
                    } else {
                        items = await this.query(
                            `SELECT "productId","quantity" FROM "CartItems" WHERE "cartId" = ${cartId}`
                        );
                        items = items?.map(({quantity, productId}) => {
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
                resolve(message.success.ADDED);
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
