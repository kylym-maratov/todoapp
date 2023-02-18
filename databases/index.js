const mongoose = require("mongoose");

module.exports = async function (url) {
    mongoose.set("strictQuery", false);
    await mongoose.connect(url);
}