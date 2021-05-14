import bcrypt from "bcrypt";
const saltRounds = 10;

const hashText = function (text) {
    return new Promise(resolve => {
        bcrypt.hash(text, saltRounds).then(hash => {
            resolve(hash);
        });
    });
};
const compareHashedText = function (plainText, hashedText) {
    return new Promise(resolve => {
        bcrypt.compare(plainText, hashedText).then(result => {
            resolve(result);
        });
    });
};

export {hashText, compareHashedText};
