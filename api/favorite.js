const router = require("express").Router();
const favoriteController = require("../controller/favorite");

const favoriteMiddleware = require("../middleware/favorite");
const {auth} = require("../middleware/auth");

router.get("/",
    auth,
    favoriteController.get); // get all favorite

router.post("/:menuId",
    auth,
    favoriteMiddleware.mod,
    favoriteMiddleware.add,
    favoriteController.add); // add favorite to menu[menuId]

router.delete("/:menuId",
    auth,
    favoriteMiddleware.mod,
    favoriteMiddleware.delete,
    favoriteController.delete); // delete favorite from menu[menuId]

module.exports = router;