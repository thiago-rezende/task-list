const { Router } = require("express");

/* controllers */
const { createUser, listUsers } = require("../controllers");

/* router */
const users = Router();

/* create */
users.post("/", createUser());

/* list */
users.get("/", listUsers());

module.exports = users;
