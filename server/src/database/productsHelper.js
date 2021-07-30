import {message} from "../utils/constants.js";
import DbHelperPlugin from "./core/dbHelperPlugin.js";
class ProductsHelper extends DbHelperPlugin {
    constructor() {
        super();
    }
    getProducts(productId) {
        return new Promise(async (resolve, reject) => {
            let queryString;
            if (!productId) {
                queryString = `SELECT *FROM "Products";`;
            } else {
                let productIds;
                if (Array.isArray(productId)) {
                    productIds = productId;
                } else {
                    productIds = [productId];
                }
                queryString = `SELECT * FROM "Products" WHERE id IN ('${productIds.join(
                    "','"
                )}');`;
            }
            try {
                const products = (await this.query(queryString)) || [];
                resolve(products);
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }

    getProduct(id) {
        return new Promise(async (resolve, reject) => {
            const queryString = `SELECT * FROM "Products" WHERE id = '${id}'`;
            try {
                resolve(await this.query(queryString, true));
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }
}

export default new ProductsHelper();
