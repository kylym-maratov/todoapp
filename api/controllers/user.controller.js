const { Router } = require("express");
const UserService = require("../../services/user.service");
const { isAuthCorrectMiddleware, themeMiddleware } = require("../../middlewares/user.middleware");
const tokenMiddleware = require("../../middlewares/token.middleware");

const userController = Router();
const userService = new UserService();

userController.post("/signup", isAuthCorrectMiddleware, userService.signup);
userController.post("/login", [isAuthCorrectMiddleware.filter((item, i) => i !== 1)], userService.login);
userController.post("/check-user", [isAuthCorrectMiddleware.filter((item, i) => i !== 2)], userService.checkUser);
userController.put("/change-theme", [tokenMiddleware, themeMiddleware], userService.changeTheme);
userController.get("/get-user", [tokenMiddleware], userService.getUser);

module.exports = userController;