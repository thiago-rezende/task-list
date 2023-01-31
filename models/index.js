const { User, initUser } = require("./user");
const { Task, initTask } = require("./task");

/* database initialization */
const initModels = (sequelize) => {
  initUser(sequelize);
  initTask(sequelize);

  /* force database schema synchronization */
  sequelize.sync({ force: true });
};

module.exports = {
  User,
  Task,
  initModels,
};
