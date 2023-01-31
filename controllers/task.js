/* models */
const { Task } = require("../models");

/* views */
const { taskList, taskView } = require("../views");

/* task creation controller */
const createTask = () => async (req, res, next) => {
  /* token payload */
  const { user } = req.payload;

  /* request validation */
  if (!req.body.task) {
    return next(new Error("missing the task object"));
  }

  const { text, done } = req.body.task;

  if (!text) {
    return next(new Error("missing the text field"));
  }

  const taskData = { text, userId: user.id };

  if (done != undefined) {
    taskData.done = done;
  }

  /* task creation */
  try {
    const task = await Task.create(taskData);

    /* task creation view */
    res.status(201).json({ task: taskView(task, ["userId"]) });
  } catch (err) {
    /* send message to error handler */
    return next(new Error("failed at task creation"));
  }
};

/* tasks listing controller */
const listTasks = () => async (req, res, next) => {
  /* token payload */
  const { user } = req.payload;

  /* tasks listing */
  const tasks = await Task.findAll({
    where: {
      userId: user.id,
    },
  });

  /* tasks listing response [ without "userId" ] */
  res.status(200).json(taskList(tasks, ["userId"]));
};

const updateTask = () => async (req, res, next) => {
  /* token payload */
  const { user } = req.payload;

  /* task id */
  const { id } = req.params;

  /* request validation */
  if (!req.body.task) {
    return next(new Error("missing the task object"));
  }

  /* request data check */
  const { text, done } = req.body.task;

  const taskData = {};

  /* update text only if it was passed */
  if (text) {
    taskData.text = text;
  }

  /* update done only if it was passed */
  if (done != undefined) {
    taskData.done = done;
  }

  const count = await Task.update(taskData, {
    where: {
      id,
      userId: user.id,
    },
  });

  /* check for updated rows */
  if (count == 0) {
    return next(new Error("task not found"));
  }

  /* retrieve the updated record */
  const task = await Task.findOne({ where: { id, userId: user.id } });

  /* task update response [ without "userId" ] */
  res.status(200).json({ task: taskView(task, ["userId"]) });
};

const deleteTask = () => async (req, res, next) => {
  /* token payload */
  const { user } = req.payload;

  /* task id */
  const { id } = req.params;

  const count = await Task.destroy({
    where: {
      id,
      userId: user.id,
    },
  });

  /* check for updated rows */
  if (count == 0) {
    return next(new Error("task not found"));
  }

  /* delete task response */
  res.status(204).send();
};

module.exports = {
  createTask,
  listTasks,
  updateTask,
  deleteTask,
};
