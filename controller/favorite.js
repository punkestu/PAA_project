const {favorite} = require("./db");

module.exports = {
    get: async function (req, res) {
        try {
            const userId = req.User.Id;
            const Favorites = await favorite.findMany({
                where: {
                    user: {
                        Id: userId
                    }
                },
                include: {
                    menu: true
                }
            });
            res.status(200).send({data: Favorites});
        } catch (e) {
            res.status(500).send({errors: e});
        }
    },
    add: async function (req, res) {
        try {
            const userId = req.User.Id;
            const menuId = parseInt(req.params.menuId);
            const Favorite = await favorite.create({
                data: {
                    menu: {
                        connect: {
                            Id: menuId
                        }
                    },
                    user: {
                        connect: {
                            Id: userId
                        }
                    }
                }
            });

            res.status(200).send({result: Favorite});
        } catch (e) {
            console.log(e);
            res.status(500).send({errors: e});
        }
    },
    delete: async function (req, res) {
        try{
            const userId = req.User.Id;
            const menuId = parseInt(req.params.menuId);
            const Favorite = await favorite.delete({
                where: {
                    menu_id_user_id: {
                        menu_id: menuId,
                        user_id: userId
                    }
                }
            })
            res.status(200).send({result: Favorite});
        }catch (e) {
            res.status(500).send({errors: e});
        }
    }
};