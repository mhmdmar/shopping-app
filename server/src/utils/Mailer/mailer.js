import nodemailer from "nodemailer";
import authConfig from "./authConfig.js";
import {message} from "../constants.js";

const {email, password} = authConfig;
function _sendEmail(targetEmail, subject, text, cc) {
    return new Promise(async (resolve, reject) => {
        const transporter = nodemailer.createTransport({
            /*
                if you are using Gmail service, please read this first ->
                    https://nodemailer.com/usage/using-gmail/
            */
            service: "gmail",
            auth: {
                user: email,
                pass: password
            }
        });
        try {
            const messageInfo = await transporter.sendMail({
                from: email,
                to: targetEmail,
                cc,
                subject,
                text
            });
            resolve(messageInfo);
        } catch (err) {
            reject(err);
        }
    });
}

function sendPasswordToUser(targetEmail, password) {
    if (!targetEmail) {
        throw new Error("target email cannot be empty");
    }
    if (!password) {
        throw new Error("password cannot be empty");
    }

    return new Promise(async (resolve, reject) => {
        const subject = `Restore password`;
        const text = `this is your old password: ${password} , try to not loose it next time`;
        _sendEmail(targetEmail, subject, text)
            .then(resolve)
            .catch(() => {
                reject(message.error.SENDING_EMAIL_ERROR);
            });
    });
}

export {sendPasswordToUser};
