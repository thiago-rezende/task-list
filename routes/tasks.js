const { Router } = require("express");

/* controllers */
const {
  createTask,
  listTasks,
  updateTask,
  deleteTask,
} = require("../controllers");

/* router */
const tasks = Router();

/* create */
tasks.post("/", createTask());

/* list */
tasks.get("/", listTasks());

/* update */
tasks.patch("/:id", updateTask());

/* delete */
tasks.delete("/:id", deleteTask());

module.exports = tasks;
