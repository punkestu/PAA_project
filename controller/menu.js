const { menu } = require("./db");

module.exports = {
  get: async function (req, res) {
    try {
      const Menu = await menu.findMany({});
      res.status(200).send({ data: Menu });
    } catch (e) {
      res.status(500).send({ errors: e });
    }
  },
};
