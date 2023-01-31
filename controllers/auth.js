const crypto = require("node:crypto");

/* configs */
const config = require("../config");

/* models */
const { User } = require("../models");

/* views */
const { authView, userView } = require("../views");

/* services */
const { createToken } = require("../services/jwt");

/* authentication controller */
const authenticate = () => async (req, res, next) => {
  /* request validation */
  if (!req.body.user) {
    return next(new Error("missing the user object"));
  }

  const { email, password } = req.body.user;

  if (!email) {
    return next(new Error("missing the email field"));
  }

  if (!password) {
    return next(new Error("missing the password field"));
  }

  /* password hash */
  const passwordHash = crypto.createHmac(
    "sha512",
    config.password.hmacPassword
  );
  passwordHash.update(password);

  /* authentication */
  const user = await User.findOne({
    where: { email, password: passwordHash.digest("hex") },
  });

  /* send message to error handler */
  if (!user) {
    return next(new Error("wrong credentials"));
  }

  /* token creation */
  const token = createToken({ user: userView(user) });

  /* authentication response */
  res.status(200).json(authView(token));
};

/* current logged in user controller */
const currentUser = () => async (req, res, next) => {
  /* token payload */
  const payload = req.payload;

  /* find user with payload data */
  const user = await User.findOne({
    where: { id: payload.user.id, email: payload.user.email },
  });

  /* send message to error handler */
  if (!user) {
    return next(new Error("user not found"));
  }

  /* current logged in user response */
  res.status(200).json({ user: userView(user) });
};

module.exports = {
  authenticate,
  currentUser,
};
