const { Router } = require("express");

/* controllers */
const { authenticate, currentUser } = require("../controllers");

/* router */
const auth = Router();

/* authenticate */
auth.post("/", authenticate());

/* current logged in user */
auth.get("/me", currentUser());

module.exports = auth;
