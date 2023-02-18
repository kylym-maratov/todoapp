const { Router } = require("express");
const UserService = require("../../services/user.service");
const ErrorHandler = require("../../utils/error.util");
const { generateToken, verifyToken } = require("../../utils/token.util");
const { isAuthCorrectMiddleware } = require("../../middlewares/user.middleware");
const { hashPassword, comparePassword } = require("../../utils/bcrypt.util");
const userSchema = require("../../databases/schemas/user.schema");

const userController = Router();
const userService = new UserService({
    schema: userSchema,
    token: { generateToken, verifyToken },
    bcrypt: { hashPassword, comparePassword }
})

userController.post("/signup", isAuthCorrectMiddleware, userService.signup);
userController.post("/login", isAuthCorrectMiddleware, userService.login);

module.exports = userController;