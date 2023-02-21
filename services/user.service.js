const userSchema = require("../databases/schemas/user.schema");
const { generateToken } = require("../utils/token.util");
const { hashPassword, comparePassword } = require("../utils/bcrypt.util");

class UserService {
    async getUser(req, res, next) {
        try {
            const userid = req.userid;

            const user = await userSchema.findOne({ _id: userid });

            user.password = null;

            return res.json({ message: "OK", user });
        } catch (e) {
            next(e);
        }
    }

    async changeTheme(req, res, next) {
        try {
            const userid = req.userid;
            const { theme } = req.query;

            await userSchema.findOneAndUpdate({ _id: userid }, { $set: { isDarkTheme: theme } });

            return res.json({ message: `Theme changed`, isDarkTheme: (theme === "true") });
        } catch (e) { next(e) }
    }

    async checkUser(req, res, next) {
        try {
            const { username, email } = req.body;
            const userName = await userSchema.findOne({ username });
            const userEmail = await userSchema.findOne({ email });

            return res.json({ message: "OK", username: !!userName, email: !!userEmail });
        } catch (e) { next(e) }
    }

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
            user.todos = [];

            return res.json({ message: "OK", user, accessToken: (await generateToken({ userid: user.id })) })

        } catch (e) {
            next(e);
        }
    }

    async signup(req, res, next) {
        try {
            const { email, password, username, fisrtname, lastname, phone, theme } = req.body;

            const user = await userSchema.findOne({ email });

            if (user) {
                return res.status(400).json({ message: "User with email exists" });
            }

            const hashedPassword = await hashPassword(password);

            const newUser = new userSchema({
                email,
                username,
                password: hashedPassword,
                fisrtname,
                lastname,
                phone,
                theme
            })

            await newUser.save();

            return res.status(201).json({ message: "User created" });
        } catch (e) {
            next(e);
        }
    }
}



module.exports = UserService;