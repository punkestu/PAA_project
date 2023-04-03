const router = require("express").Router();
const authController = require("../controller/auth");
const authMiddleware = require("../middleware/auth");

router.get("/", function (req,res) {
    res.send(process.env);
});

router.post("/login", authMiddleware.login, authController.login);
router.post("/register", authMiddleware.register, authController.register);

module.exports = router;