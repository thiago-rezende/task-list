const { DataTypes, Model } = require("sequelize");

/* models */
const { User } = require("./user");

/* application task model */
class Task extends Model {}

/* task model initialization */
const initTask = (sequelize) => {
  Task.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "task",
      underscored: true,
    }
  );

  User.hasMany(Task);

  Task.belongsTo(User);
};

module.exports = {
  Task,
  initTask,
};
