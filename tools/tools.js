const jwt = require("jsonwebtoken");

module.exports = {
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
}