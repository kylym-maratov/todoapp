const { Router } = require("express");
const todoController = require("./controllers/todo.controller");
const userController = require("./controllers/user.controller");
const tokenMiddleware = require("../middlewares/token.middleware");

const router = Router();

router.use("/todo", tokenMiddleware, todoController);
router.use("/user/", userController);

module.exports = router;