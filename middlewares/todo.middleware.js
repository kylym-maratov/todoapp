const { check, validationResult } = require("express-validator");

const isTodoCorrectMiddleware = [
    check("title").notEmpty().withMessage("Title cannot be empty"),
    check("description").notEmpty().withMessage("Description cannot be empty"),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Fields cannot be empty", errors: errors.array() });
        }

        next();
    }
]

module.exports = { isTodoCorrectMiddleware }