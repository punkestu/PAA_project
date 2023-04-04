const {hash} = require("bcrypt");
const {validationResult} = require("express-validator");
const {user} = require("./db");
const {signToken} = require("../tools/tools");

module.exports = {
    login: async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({errors: errors.mapped()});
        }
        try {
            const token = signToken(req.User);
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
            const token = signToken(User);
            res.status(200).json({
                token
            });
        } catch (e) {
            res.status(500).send({errors: e});
        }
    }
};