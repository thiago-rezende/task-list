const taskView = (task, filter = []) => {
  return {
    id: task.id,
    text: task.text,
    done: task.done,
    ...(filter.includes("userId") ? {} : { userId: task.userId }),
  };
};

const taskList = (tasks, filter = []) => {
  return tasks.map((task) => taskView(task, filter));
};

module.exports = {
  taskView,
  taskList,
};
