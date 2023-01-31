/* jwt configuration */
const jwt = {
  passphrase: process.env.JWT_PASSPHRASE || "secret",
};

module.exports = jwt;
