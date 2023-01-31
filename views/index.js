const authViews = require("./auth");
const userViews = require("./user");
const taskViews = require("./task");

module.exports = {
  ...authViews,
  ...userViews,
  ...taskViews,
};
