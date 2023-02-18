const { Router } = require("express");
const UserService = require("../../services/user.service");
const { isAuthCorrectMiddleware } = require("../../middlewares/user.middleware");

const userController = Router();
const userService = new UserService();

userController.post("/signup", isAuthCorrectMiddleware, userService.signup);
userController.post("/login", [isAuthCorrectMiddleware.filter((item, i) => i !== 1)], userService.login);
userController.post("/check-user", [isAuthCorrectMiddleware.filter((item, i) => i !== 2)], userService.checkUser);

module.exports = userController;