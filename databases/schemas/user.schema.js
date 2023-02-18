const { Schema, model } = require("mongoose");

module.exports = model("users", new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    todos: { type: Array, default: [] },
}, { timestamps: true }));