const { Router } = require("express");
const todoController = require("./controllers/todo.controller");
const userController = require("./controllers/user.controller");

const router = Router();

router.use("/todo", todoController);
router.use("/user/", userController);

module.exports = router;