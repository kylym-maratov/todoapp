const bcrypt = require("bcrypt");
require("dotenv").config();

async function hashPassword(password) {
    return await bcrypt.hash(password, process.env.SALT_ROUNDS || 12);
}

async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = { hashPassword, comparePassword };