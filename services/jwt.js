const jwt = require("jsonwebtoken");

/* application config */
const config = require("../config");

/* create token with given payload */
const createToken = (payload) => {
  return jwt.sign(payload, config.jwt.passphrase);
};

/* verify token and get payload*/
const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, config.jwt.passphrase);

    return payload;
  } catch (err) {
    return null;
  }
};

module.exports = {
  createToken,
  verifyToken,
};
