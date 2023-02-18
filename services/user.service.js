
class UserService {
    constructor({ schema, bcrypt, token }) {
        this.schema = schema;
        this.bcrypt = bcrypt;
        this.token = token;
    }

    async signup(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await this.schema.findOne({ email });

            if (user) {
                return res.status(400).json({ message: "User exists" });
            }

            const hashedPassword = await this.bcrypt.hashPassword(password);

            const newUser = new this.schema({
                email,
                password: hashedPassword
            })

            await newUser.save();

            return res.status(201).json({ message: "User created" });
        } catch (e) {
            next(e);
        }
    }

    async login(req, res) {

    }
}


module.exports = UserService;