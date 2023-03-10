const { Schema, model } = require("mongoose");

module.exports = model("todos", new Schema({
    title: { type: String, required: true, length: 300 },
    description: { type: String, default: "", length: 700, required: true },
    isDeleted: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false, required: true },
    isPinned: { type: Boolean, default: false, required: true },
    static: Object,
    background: { type: "String", default: "none" }
}, { timestamps: true }));