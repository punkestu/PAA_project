const jwt = require("jsonwebtoken");
const {hash} = require("bcrypt");
const {validationResult} = require("express-validator");

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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({errors: errors.mapped()});
        }
        try {
            const token = tools.signToken(req.User);
            res.status(200).send({token});
        } catch (e) {
            res.status(500).send({errors: e});
        }
    },
    register: async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({errors: errors.mapped()});
        }
        try {
            const password = await hash(req.body.password, process.env.SALT_BCRYPT);
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
            res.status(500).send({errors: e});
        }
    }
};