const { DataTypes, Model } = require("sequelize");

/* application user model */
class User extends Model {}

/* user model initialization */
const initUser = (sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
};

module.exports = {
  User,
  initUser,
};
