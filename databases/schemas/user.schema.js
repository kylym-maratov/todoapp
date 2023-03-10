const { Schema, model } = require("mongoose");

module.exports = model("users", new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    firstname: { type: String, default: "User" },
    lastname: { type: String, default: "User" },
    phone: { type: String, default: "" },
    isDarkTheme: { type: Boolean, default: false },
    todos: { type: Array, default: [] },
}, { timestamps: true }));