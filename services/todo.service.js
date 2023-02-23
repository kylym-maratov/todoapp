const userSchema = require("../databases/schemas/user.schema");
const todoSchema = require("../databases/schemas/todo.schema");

class ToodService {

    async pin(req, res, next) {
        try {
            const { todoid, pinned } = req.body;
            const userid = req.userid;

            const user = await userSchema.findOne({ _id: userid });

            if (!user.todos.includes(todoid)) return res.status(400).json({ message: "Method not allowed" })

            const todo = await todoSchema.findOneAndUpdate({ _id: todoid }, { $set: { isPinned: pinned } }, { new: true });

            return res.json({ message: "Todo pinned updated", todo })
        } catch (e) { next(e) }
    }

    async updateTitle(req, res, next) {
        try {
            const { title, todoid } = req.body;
            const userid = req.userid;

            const user = await userSchema.findOne({ _id: userid });

            if (!user.todos.includes(todoid)) return res.status(400).json({ message: "Method not allowed" })

            const todo = await todoSchema.findOneAndUpdate({ _id: todoid }, { $set: { title } }, { new: true });

            return res.json({ message: "Todo title updated", todo })
        } catch (e) { next(e) }
    }

    async updateDescritpion(req, res, next) {
        try {
            const { description, todoid } = req.body;
            const userid = req.userid;

            const user = await userSchema.findOne({ _id: userid });

            if (!user.todos.includes(todoid)) return res.status(400).json({ message: "Method not allowed" })

            const todo = await todoSchema.findOneAndUpdate({ _id: todoid }, { $set: { description } }, { new: true });

            return res.json({ message: "Todo description updated", todo })
        } catch (e) { next(e) }
    }

    async deleteTodo(req, res, next) {
        try {
            const { todoid } = req.body;
            const userid = req.userid;

            const user = await userSchema.findOne({ _id: userid });

            if (!user.todos.includes(todoid)) return res.status(400).json({ message: "Method not allowed" })

            await todoSchema.deleteOne({ _id: todoid });

            await userSchema.updateOne({ _id: userid }, { $pull: { todos: todoid } });

            return res.json({ message: "Todo deleted" });
        } catch (e) { next(e) }
    }

    async getTodos(req, res, next) {
        try {
            const userid = req.userid;

            const user = await userSchema.findOne({ _id: userid });

            const todos = [];
            const pinned = [];

            for (let todoid of user.todos) {
                const todo = await todoSchema.findOne({ _id: todoid });
                if (todo && !todo.isPinned) {
                    todos.push(todo);
                }
                if (todo && todo.isPinned) {
                    pinned.push(todo);
                }
            }

            return res.json({ message: "OK", todos, pinned });
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

            await userSchema.updateOne({ _id: userid }, { $push: { todos: newTodo._id.toString() } });

            return res.json({ message: "Todo created" });
        } catch (e) { next(e) }
    }
}



module.exports = new ToodService();