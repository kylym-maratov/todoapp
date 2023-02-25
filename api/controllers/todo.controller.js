const { Router } = require("express");
const { isTodoCorrectMiddleware, isTodoIdMiddlware, isTodoTitleUpdateMiddleware } = require("../../middlewares/todo.middleware");
const todoSerivce = require("../../services/todo.service");

const todoController = Router();

todoController.get("/todos", todoSerivce.getTodos);
todoController.post("/create", isTodoCorrectMiddleware, todoSerivce.createTodo)
todoController.delete("/delete", isTodoIdMiddlware.filter((item, i) => i !== 1 && i !== 2), todoSerivce.deleteTodo);
todoController.put("/update-title", isTodoIdMiddlware.filter((item, i) => i !== 2), todoSerivce.updateTitle);
todoController.put("/update-description", isTodoIdMiddlware.filter((item, i) => i !== 1), todoSerivce.updateDescritpion)
todoController.put("/pin", [isTodoIdMiddlware.filter((item, i) => i !== 1 && i !== 2)], todoSerivce.pin)
todoController.put("/set-color", isTodoIdMiddlware.filter((item, i) => i !== 1 && i !== 2), todoSerivce.setColor);

module.exports = todoController;