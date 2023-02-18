const userSchema = require("../databases/schemas/user.schema");
const { generateToken } = require("../utils/token.util");
const { hashPassword, comparePassword } = require("../utils/bcrypt.util");

class UserService {

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await userSchema.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            if (!(await comparePassword(password, user.password))) {
                return res.status(400).json({ message: "Icorrect login data" });
            }

            user.password = null;
            user.todos = null;

            return res.json({ message: "OK", user, token: (await generateToken({ userid: user.id })) })

        } catch (e) {
            next(e);
        }
    }

    async signup(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await userSchema.findOne({ email });

            if (user) {
                return res.status(400).json({ message: "User exists" });
            }

            const hashedPassword = await hashPassword(password);

            const newUser = new userSchema({
                email,
                password: hashedPassword
            })

            await newUser.save();

            return res.status(201).json({ message: "User created" });
        } catch (e) {
            next(e);
        }
    }
}



module.exports = UserService;