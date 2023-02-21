const { validationResult, check } = require("express-validator");

const isAuthCorrectMiddleware = [
    check("email").isEmail().withMessage("Email must be email"),
    check("username").isLength({ min: 3 }).withMessage("Username field required, min 3 symbols"),
    check("password").isLength({ min: 8, max: 30 }).withMessage("Password min 8 max 30 length"),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Incorrect data", errors: errors.array() });
        }

        next();
    }
]

function themeMiddleware(req, res, next) {
    let theme = (req.query.theme === "true");

    if (typeof theme !== "boolean") return res.status(400).json({ message: "Theme field required" });

    next()
}

module.exports = { isAuthCorrectMiddleware, themeMiddleware };