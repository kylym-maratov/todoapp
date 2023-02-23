const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(data) {
    return new Promise((res, rej) => {
        jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "30d" }, (err, token) => {
            if (err) rej(err);

            res(token);
        })
    })
};


function validToken(token) {
    return new Promise((res, rej) => {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) rej(err);

            res(decoded);
        })
    })
};



module.exports = { generateToken, validToken };