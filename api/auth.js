const router = require("express").Router();
const authController = require("../controller/auth");
const authMiddleware = require("../middleware/auth");

router.get("/", function (req, res) {
    res.send(process.env);
});

router.post("/login",
    [
        authMiddleware.struct.username,
        authMiddleware.struct.password
    ],
    authMiddleware.login,
    authController.login);

router.post("/register",
    [
        authMiddleware.struct.username,
        authMiddleware.struct.email,
        authMiddleware.struct.password
    ],
    authMiddleware.register,
    authController.register);

router.put("/password",
    [
        authMiddleware.struct.email,
        authMiddleware.struct.password
    ],
    authMiddleware.changePassword,
    authController.changePassword);

module.exports = router;