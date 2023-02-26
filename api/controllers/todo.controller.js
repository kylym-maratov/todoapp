const { Router } = require("express");
const { isTodoCorrectMiddleware, isTodoIdMiddlware, isTodoTitleUpdateMiddleware } = require("../../middlewares/todo.middleware");
const todoSerivce = require("../../services/todo.service");

const todoController = Router();

const todoIdMiddlewrae = isTodoIdMiddlware.filter((item, i) => i !== 1 && i !== 2);

todoController.get("/todos", todoSerivce.getTodos);
todoController.post("/create", isTodoCorrectMiddleware, todoSerivce.createTodo)
todoController.delete("/delete", todoIdMiddlewrae, todoSerivce.deleteTodo);
todoController.put("/update-title", isTodoIdMiddlware.filter((item, i) => i !== 2), todoSerivce.updateTitle);
todoController.put("/update-description", isTodoIdMiddlware.filter((item, i) => i !== 1), todoSerivce.updateDescritpion)
todoController.put("/pin", todoIdMiddlewrae, todoSerivce.pin)
todoController.put("/set-color", todoIdMiddlewrae, todoSerivce.setColor);
todoController.put("/set-completed", todoIdMiddlewrae, todoSerivce.setCompleted);
todoController.put("/restore-todo", todoIdMiddlewrae, todoSerivce.restoreTodo);

module.exports = todoController;