import config from "../../../config/config.js";
import jwt from "jsonwebtoken";
const {JWT_KEY} = config;

const createToken = function (user) {
    return jwt.sign(user, JWT_KEY);
};
const validateToken = function (token, cb) {
    jwt.verify(token, JWT_KEY, (err, user) => {
        cb(err, user);
    });
};

export {createToken, validateToken};
