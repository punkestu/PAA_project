const { setEnvValue } = require("./tools");
require("crypto").randomBytes(48, function (err, buffer) {
  var token = buffer.toString("hex");
  setEnvValue("JWT_PRIVATE_KEY", '"'+token+'"');
});
