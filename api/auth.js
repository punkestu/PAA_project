const router = require("express").Router();
const authController = require("../controller/auth");
const authMiddleware = require("../middleware/auth");

router.get("/", function (req, res) {
    res.send(process.env);
});

router.post("/login",
    authMiddleware.login,
    [
        authMiddleware.struct.username,
        authMiddleware.struct.password
    ],
    authController.login);

router.post("/register",
    [
        authMiddleware.struct.username,
        authMiddleware.struct.email,
        authMiddleware.struct.password
    ],
    authMiddleware.register,
    authController.register);

module.exports = router;