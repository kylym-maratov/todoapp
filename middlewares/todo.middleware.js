const { check, validationResult } = require("express-validator");
const userSchema = require("../databases/schemas/user.schema");

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


const isTodoMiddlewware = async (req, res, next) => {
    try {
        const userid = req.userid;
        const user = await userSchema.findOne({ _id: userid });
        const { todoid } = req.body;

        if (!user.todos.includes(todoid)) return res.status(400).json({ message: "Method not allowed" })

        next()
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

module.exports = { isTodoCorrectMiddleware, isTodoIdMiddlware, isTodoMiddlewware }