const JWT = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const { JWT_SECRET } = process.env;;

module.exports = {

    signAccessToken: (payload) => {
        return new Promise((resolve, reject) => {
            const options = {
                expiresIn: '12h'
            };
            JWT.sign(payload, JWT_SECRET, options, (err, token) => {
                if (err) {
                    reject(err);
                }
                resolve(token);
            });
        });
    },

    passwordEncrypt: (password) => {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    resolve(hash);
                });
            });
        });
    },

    passwordCompare: (password, hash) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, function (err, res) {
                if (res) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            });
        });
    },

};
