const { Router } = require("express");
const { isTodoCorrectMiddleware } = require("../../middlewares/todo.middleware");
const todoSerivce = require("../../services/todo.service");

const todoController = Router();

todoController.get("/todos", todoSerivce.getTodos);
todoController.post("/create", isTodoCorrectMiddleware, todoSerivce.createTodo)

module.exports = todoController;