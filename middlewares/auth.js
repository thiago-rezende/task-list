const { verifyToken } = require("../services/jwt");

/* authentication middleware */
const auth = () => (req, res, next) => {
  /* skip authentication check on the following routes */
  if (req.path === "/") return next();
  if (req.path === "/auth" && req.method === "POST") return next();
  if (req.path === "/users" && req.method === "POST") return next();

  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(new Error("missing authorization token"));
  }

  const token = authorization.split(" ")[1];

  const payload = verifyToken(token);

  if (!payload) {
    return next(new Error("invalid token"));
  }

  req.payload = payload;

  next();
};

module.exports = auth;
