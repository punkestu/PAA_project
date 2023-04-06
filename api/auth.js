const router = require("express").Router();
const authController = require("../controller/auth");
const authMiddleware = require("../middleware/auth");

router.get("/", function (req, res) {
  res.send(process.env);
});

router.post(
  "/login",
  [
    authMiddleware.struct.username,
    authMiddleware.exist.username,
    authMiddleware.struct.password,
  ],
  authMiddleware.login,
  authController.login
);

router.post(
  "/register",
  [
    authMiddleware.struct.username,
    authMiddleware.notExists.username,
    authMiddleware.struct.email,
    authMiddleware.notExists.email,
    authMiddleware.struct.password,
  ],
  authController.register
);

router.get(
  "/email",
  [authMiddleware.struct.email, authMiddleware.exist.email],
  authController.checkEmail
);

router.put(
  "/password",
  [
    authMiddleware.struct.email,
    authMiddleware.exist.email,
    authMiddleware.struct.password,
  ],
  authController.changePassword
);

module.exports = router;
