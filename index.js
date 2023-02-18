const express = require("express");
const path = require("path");
const mogranLogger = require("./utils/logger.util");
const api = require("./api");
const connectDb = require("./databases");
const ErrorHandler = require("./utils/error.util");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const mongourl = process.env.MONGO_URL;
const started = () => console.log(`Server running on port: ${port}`);

app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.json());
app.use(mogranLogger);
app.use("/api/", api);
app.use(ErrorHandler);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, "client/build", "index.hmtl")));

connectDb(mongourl)
    .then(() => app.listen(port, started))
    .catch(err => console.log(`Error: ${err}`)); 