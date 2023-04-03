const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {user} = require("./db");

const tools = {
    validateToken: async function (token) {
        try {
            return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        } catch (e) {
            return null;
        }
    },
    signToken: function (payload) {
        return jwt.sign(payload, process.env.JWT_PRIVATE_KEY);
    },
}

module.exports = {
    tools,
    login: async function (req, res) {
        try {
            const User = await user.findFirst({
                where: {
                    username: req.body.username
                }
            });
            if (User == null) {
                res.status(400).send({
                    errors: {
                        username: "Username tidak terdaftar"
                    }
                })
            }
            const valid = await bcrypt.compare(req.body.password, User.password);
            if (valid) {
                const token = tools.signToken(User);
                res.status(200).send({token});
            } else {
                res.status(400).send({
                    errors: {
                        password: "Password salah"
                    }
                });
            }
        } catch (e) {
            res.status(500).send(e);
        }
    },
    register: async function (req, res) {
        try {
            const password = await bcrypt.hash(req.body.password, process.env.SALT_BCRYPT);
            const User = await user.create({
                data: {
                    username: req.body.username,
                    email: req.body.email,
                    password
                }
            });
            const token = tools.signToken(User);
            res.status(200).json({
                token
            });
        } catch (e) {
            res.status(500).send(e);
        }
    }
};