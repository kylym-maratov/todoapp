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

const isTodoIdMiddlware = [
    check("todoid").notEmpty().withMessage({ message: "Todo id required" }),
    check("title").notEmpty().withMessage({ message: "New title required" }),
    check("description").notEmpty().withMessage({ message: "New description required" }),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Fields cannot be empty", errors: errors.array() });
        }

        next();
    }
]


module.exports = { isTodoCorrectMiddleware, isTodoIdMiddlware }