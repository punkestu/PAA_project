const router = require("express").Router();
const authController = require("../controller/auth");

router.get("/", function (req,res) {
    res.send(process.env);
});

router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;