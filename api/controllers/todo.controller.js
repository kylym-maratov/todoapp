const { Router } = require("express");
const { isTodoCorrectMiddleware, isTodoIdMiddlware } = require("../../middlewares/todo.middleware");
const todoSerivce = require("../../services/todo.service");

const todoController = Router();

todoController.get("/todos", todoSerivce.getTodos);
todoController.post("/create", isTodoCorrectMiddleware, todoSerivce.createTodo)
todoController.delete("/delete", isTodoIdMiddlware, todoSerivce.deleteTodo);
todoController.put("/update", [isTodoIdMiddlware])

module.exports = todoController;