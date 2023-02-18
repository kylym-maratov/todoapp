const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(data) {
    return new Promise((res, rej) => {
        jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 }, (err, token) => {
            if (err) rej(err);

            res(token);
        })
    })
};


function decodeToken(token) {
    return new Promise((res, rej) => {
        jwt.decode(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) rej(err);

            res(decoded);
        })
    })
};



module.exports = { generateToken, decodeToken };