/* database configuration */
const database = {
  dialect: process.env.DB_DIALECT || "sqlite",
  host: process.env.DB_HOST || undefined,
  database: process.env.DB_DATABASE || undefined,
  username: process.env.DB_USERNAME || undefined,
  password: process.env.DB_PASSWORD || undefined,
  storage: process.env.DB_STORAGE || ":memory:",
  logging: process.env.DB_LOGGING || console.log,
};

module.exports = database;
