import {message} from "../utils/constants.js";
import DbHelperPlugin from "./core/dbHelperPlugin.js";
import {convertToNumber} from "../utils/strings.js";
class ProductsHelper extends DbHelperPlugin {
    constructor() {
        super();
    }

    _getCartProduct(cartId, productId) {
        return new Promise(async (resolve, reject) => {
            const queryString = `SELECT "cartId", "productId", "quantity" FROM "CartItems" 
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
            const queryString = `DELETE from "CartItems" WHERE "cartId" = '${cartId}' AND "productId" = '${productId}'`;
            try {
                resolve(await this.query(queryString));
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }

    _updateCartProduct(cartId, productId, quantity) {
        return new Promise(async (resolve, reject) => {
            const queryString = `UPDATE "CartItems" SET quantity= ${quantity} WHERE "cartId" = '${cartId}' AND "productId" = '${productId}'`;
            try {
                resolve(await this.query(queryString));
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }

    _insertProductToCart(cartId, productId, quantity) {
        return new Promise(async (resolve, reject) => {
            const queryString = `INSERT INTO "CartItems"("cartId", "productId", "quantity")VALUES (${cartId}, ${productId}, ${quantity})`;
            try {
                resolve(await this.query(queryString));
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }

    addProductToCart(email, cartId, productId, quantity = 1) {
        return new Promise(async (resolve, reject) => {
            quantity = convertToNumber(quantity);
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
            quantity = convertToNumber(quantity);
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

export default new ProductsHelper();
