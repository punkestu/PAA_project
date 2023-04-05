const {body} = require("express-validator");
const {compare} = require("bcrypt");
const {user} = require("../controller/db");
const tools = require("../tools/tools");

module.exports = {
    auth: async function (req, res, next) {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ');
            req.User = await tools.validateToken(token[1]);

            if (req.User) {
                next();
            }
        } else {
            return res.status(403).send({msg: "Unauthorized"});
        }
    },
    struct: {
        username:
            body("username")
                .notEmpty().withMessage("Username harus diisi")
                .isLength({
                    min: 8,
                    max: 15
                }).withMessage("Username harus 8-15 karakter"),
        password:
            body("password")
                .notEmpty().withMessage("Password harus diisi")
                .isLength({min: 8}).withMessage("Password minimal 8 karakter"),
        email:
            body("email")
                .notEmpty().withMessage("Email harus diisi")
                .isEmail().withMessage("Email tidak valid")
    },
    exist: {
        username: body("username")
            .custom(async (username, {req}) => {
                req.User = await user.findFirst({
                    where: {
                        username
                    }
                });
                if (!req.User) {
                    throw new Error("Username tidak ditemukan");
                }
            }),
        email: body("email")
            .custom(async (email) => {
                const User = await user.findFirst({
                    where: {
                        email
                    }
                });
                if (!User) {
                    throw new Error("Email tidak ditemukan");
                }
            })
    },
    notExists: {
        username: body("username")
            .custom(async (username) => {
                const User = await user.findFirst({
                    where: {
                        username
                    }
                });
                if (User) {
                    throw new Error("Username sudah digunakan");
                }
            }),
        email: body("email")
            .custom(async (email) => {
                const User = await user.findFirst({
                    where: {
                        email
                    }
                });
                if (User) {
                    throw new Error("Email sudah digunakan");
                }
            })
    },
    login: [
        body("password")
            .custom(async (password, {req}) => {
                if (req.User) {
                    const valid = await compare(req.body.password, req.User.password);
                    if (!valid) {
                        throw new Error("Password salah");
                    }
                }
            })
    ]
}
;