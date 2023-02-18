const { validationResult, check } = require("express-validator");

const isAuthCorrectMiddleware = [
    check("email").isEmail().withMessage("Email must be email"),
    check("password").isLength({ min: 8, max: 30 }).withMessage("Password min 8 max 30 length"),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Bad request", errors: errors.array() });
        }

        next();
    }
]


module.exports = { isAuthCorrectMiddleware };