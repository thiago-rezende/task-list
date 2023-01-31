const crypto = require("node:crypto");

/* configs */
const config = require("../config");

/* models */
const { User, Task } = require("../models");

/* views */
const { userList, userView } = require("../views");

/* user creation controller */
const createUser = () => async (req, res, next) => {
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

  /* user creation */
  try {
    const passwordHash = crypto.createHmac(
      "sha512",
      config.password.hmacPassword
    );
    passwordHash.update(password);

    const user = await User.create({
      email,
      password: passwordHash.digest("hex"),
    });

    /* user creation view */
    res.status(201).json({ user: userView(user) });
  } catch (err) {
    /* send message to error handler */
    return next(new Error("email should be unique"));
  }
};

/* user listing controller */
const listUsers = () => async (req, res, next) => {
  /* users listing */
  const users = await User.findAll({
    include: [
      {
        model: Task,
      },
    ],
  });

  /* users listing response */
  res.status(200).json(userList(users, ["userId"]));
};

module.exports = {
  createUser,
  listUsers,
};
