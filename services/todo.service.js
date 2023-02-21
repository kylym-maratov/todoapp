const userSchema = require("../databases/schemas/user.schema");
const todoSchema = require("../databases/schemas/todo.schema");



class ToodService {
    async getTodos(req, res, next) {
        try {
            const userid = req.userid;

            const user = await userSchema.findOne({ _id: userid });

            const todos = [];

            for (let todoid of user.todos) {
                const todo = await todoSchema.findOne({ _id: todoid });
                todos.push(todo);
            }

            return res.json({ message: "OK", todos });
        } catch (e) { next(e) }
    }

    async createTodo(req, res, next) {
        try {
            const userid = req.userid;
            const { title, description } = req.body;

            const newTodo = new todoSchema({
                title,
                description
            })
            await newTodo.save()

            await userSchema.updateOne({ _id: userid }, { $push: { todos: newTodo._id } });

            return res.json({ message: "Todo created" });
        } catch (e) { next(e) }
    }
}



module.exports = new ToodService();