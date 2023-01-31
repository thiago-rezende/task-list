/* password configuration */
const password = {
  hmacPassword: process.env.HMAC_PASSPHRASE || "secret",
};

module.exports = password;
