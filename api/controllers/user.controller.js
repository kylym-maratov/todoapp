const { Router } = require("express");
const UserService = require("../../services/user.service");
const { isAuthCorrectMiddleware } = require("../../middlewares/user.middleware");

const userController = Router();
const userService = new UserService();

userController.post("/signup", isAuthCorrectMiddleware, userService.signup);
userController.post("/login", isAuthCorrectMiddleware, userService.login);

module.exports = userController;