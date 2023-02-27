const { Router } = require("express");
const { isTodoCorrectMiddleware, isTodoIdMiddlware, isTodoMiddlewware } = require("../../middlewares/todo.middleware");
const todoSerivce = require("../../services/todo.service");

const todoController = Router();

const todoIdMiddlewrae = isTodoIdMiddlware.filter((item, i) => i !== 1 && i !== 2);

todoController.get("/todos", todoSerivce.getTodos);
todoController.post("/create", isTodoCorrectMiddleware, todoSerivce.createTodo)
todoController.delete("/delete", [todoIdMiddlewrae, isTodoMiddlewware], todoSerivce.deleteTodo);
todoController.put("/update-title", [isTodoIdMiddlware.filter((item, i) => i !== 2), isTodoMiddlewware], todoSerivce.updateTitle);
todoController.put("/update-description", [isTodoIdMiddlware.filter((item, i) => i !== 1), isTodoMiddlewware], todoSerivce.updateDescritpion)
todoController.put("/pin", [todoIdMiddlewrae, isTodoMiddlewware], todoSerivce.pin)
todoController.put("/set-color", [todoIdMiddlewrae, isTodoMiddlewware], todoSerivce.setColor);
todoController.put("/set-completed", [todoIdMiddlewrae, isTodoMiddlewware], todoSerivce.setCompleted);
todoController.delete("/delete-forever", [todoIdMiddlewrae, isTodoMiddlewware], todoSerivce.deleteTodoForever);

module.exports = todoController;