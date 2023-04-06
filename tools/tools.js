const jwt = require("jsonwebtoken");
const fs = require("fs");
const os = require("os");

module.exports = {
  setEnvValue: function (key, value) {
    const ENV_VARS = fs.readFileSync("./.env", "utf8").split(os.EOL);

    const target = ENV_VARS.indexOf(
      ENV_VARS.find((line) => {
        return line.match(new RegExp(key));
      })
    );

    ENV_VARS.splice(target, 1, `${key}=${value}`);
    
    fs.writeFileSync("./.env", ENV_VARS.join(os.EOL));
  },
  validateToken: async function (token) {
    try {
      return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    } catch (e) {
      return null;
    }
  },
  signToken: function (payload) {
    return jwt.sign(payload, process.env.JWT_PRIVATE_KEY);
  },
};
