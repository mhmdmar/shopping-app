import {message} from "../utils/constants.js";
import DbHelperPlugin from "./core/dbHelperPlugin.js";

const DEFAULT_USER_PROFILE_PICTURE = "/images/img_avatar.png";
class UsersHelper extends DbHelperPlugin {
    constructor() {
        super();
    }
    getUsers() {
        return new Promise(async (resolve, reject) => {
            const queryString = `SELECT email, username, password, "profilePicture" FROM "Users";`;
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
            const queryString = `SELECT "cartId" FROM "Carts" WHERE "userId" ='${email}' AND "checkedOut" = false;`;
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
            const queryString = `SELECT password FROM "Users" WHERE email = '${email}'`;
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
            const queryString = `SELECT email, username, "profilePicture" FROM "Users" WHERE email = '${email}' AND password = '${password}';`;
            try {
                const userData = await this.query(queryString, true);
                if (userData !== null) {
                    let items = [];
                    let cartId = await this.getOpenedUserCartId(email);
                    if (!cartId) {
                        await this.query(
                            `INSERT INTO "Carts"("userId", "dateCreated", "checkedOut") VALUES ( '${email}',  NOW(), false);`
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
            const queryString = `INSERT INTO "Users" ("email","username","password","profilePicture")
                            VALUES ('${email}','${username}','${password}','${DEFAULT_USER_PROFILE_PICTURE}')`;
            try {
                await this.query(queryString);
                resolve(message.success.ADDED);
            } catch (err) {
                if (err.code === "23505") {
                    reject(message.error.EMAIL_ALREADY_EXISTS);
                } else {
                    reject(message.error.UNKNOWN_DATABASE_ERROR);
                }
            }
        });
    }

    updateUserField(email, key, value) {
        return new Promise(async (resolve, reject) => {
            const queryString = `UPDATE "Users" SET "${key}" = '${value}' WHERE "email" = '${email}';`;
            try {
                await this.query(queryString);
                resolve(message.success.UPDATED);
            } catch (err) {
                reject(message.error.UNKNOWN_DATABASE_ERROR);
            }
        });
    }

    updateUserPassword(email, password) {
        return this.updateUserField(email, "password", password);
    }

    updateUserProfilePicture(email, profilePicture) {
        return this.updateUserField(email, "profilePicture", profilePicture);
    }
}

export default new UsersHelper();
