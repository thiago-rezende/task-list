const { taskList } = require("./task");

const userView = (user, filter = []) => {
  return {
    id: user.id,
    email: user.email,
    ...(user.tasks ? { tasks: taskList(user.tasks, filter) } : {}),
  };
};

const userList = (users, filter = []) => {
  return users.map((user) => userView(user, filter));
};

module.exports = {
  userView,
  userList,
};
