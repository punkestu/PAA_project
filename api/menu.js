const router = require("express").Router();
const menuController = require("../controller/menu");

router.get("/", menuController.get);

module.exports = router;
