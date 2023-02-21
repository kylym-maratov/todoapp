const userSchema = require("../databases/schemas/user.schema");
const { validToken } = require("../utils/token.util");

async function tokenMiddleware(req, res, next) {
    try {

        const accessToken = req.headers["authorization"];

        if (!accessToken) {
            return res.status(400).json({ message: "Access token required" });
        }

        const decoded = await validToken(accessToken);

        const user = await userSchema.findOne({ _id: decoded.userid });

        if (!user) {
            return res.status(400).json({ message: "User not found, try login again" });
        }

        req.userid = decoded.userid;

        next();
    } catch (e) {
        next(e)
    }
}


module.exports = tokenMiddleware;