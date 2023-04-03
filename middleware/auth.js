const {body} = require("express-validator");
const {compare} = require("bcrypt");
const {user} = require("../controller/db");

module.exports = {
    login: [
        body("username")
            .notEmpty().withMessage("Username harus diisi")
            .isLength({
                min: 8,
                max: 15
            }).withMessage("Username harus 8-15 karakter")
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
        body("password")
            .notEmpty().withMessage("Password harus diisi")
            .isLength({min: 8}).withMessage("Password minimal 8 karakter")
            .custom(async (password, {req}) => {
                if (req.User) {
                    const valid = await compare(req.body.password, req.User.password);
                    if (!valid) {
                        throw new Error("Password salah");
                    }
                }
            })
    ],
    register: [
        body("username")
            .notEmpty().withMessage("Username harus diisi")
            .isLength({
                min: 8,
                max: 15
            }).withMessage("Username harus 8-15 karakter")
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
        body("email")
            .notEmpty().withMessage("Email harus diisi")
            .isEmail().withMessage("Email tidak valid")
            .custom(async (email) => {
                const User = await user.findFirst({
                    where: {
                        email
                    }
                });
                if (User) {
                    throw new Error("Email sudah digunakan");
                }
            }),
        body("password")
            .notEmpty().withMessage("Password harus diisi")
            .isLength({min: 8}).withMessage("Password minimal 8 karakter")
    ]
};