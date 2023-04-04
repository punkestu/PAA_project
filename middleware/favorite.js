const {menu, favorite} = require("../controller/db");

module.exports = {

    mod: [
        async function (req, res, next) {
            try {
                const Menu = await menu.findFirst({
                    where: {
                        Id: parseInt(req.params.menuId)
                    }
                });
                if (Menu) {
                    next();
                } else {
                    res.status(404).send({msg: "Menu not found"});
                }
            } catch (e) {
                res.status(500).send({errors: e});
            }
        },
        async function (req, res, next) {
            try {
                req.Favorite = await favorite.findFirst({
                    where: {
                        menu: {
                            Id: parseInt(req.params.menuId)
                        },
                        user: {
                            Id: req.User.Id
                        }
                    }
                });
                next();
            } catch (e) {
                res.status(500).send({errors: e});
            }
        }
    ],
    add: async function (req, res, next) {
        if (!req.Favorite) {
            next();
        } else {
            return res.status(409).send({msg: "Favorite duplicate"});
        }
    },
    delete: async function (req, res, next) {
        if (req.Favorite) {
            next();
        } else {
            return res.status(404).send({msg: "Favorite not found"});
        }
    }
};