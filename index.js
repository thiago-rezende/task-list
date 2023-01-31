const cors = require("cors");
const express = require("express");

const { Sequelize } = require("sequelize");

/* application config */
const config = require("./config");

/* routes */
const { auth, users, tasks } = require("./routes");

/* middlewares */
const { authMiddleware, errorMiddleware } = require("./middlewares");

/* database connection */
const sequelize = new Sequelize(config.database);

try {
  sequelize.authenticate();

  console.log("[ databes ] <authenticate> connection successfull");
} catch (err) {
  console.log("[ databes ] <authenticate> connection error");

  process.exit(-1);
}

/* database models */
const { initModels } = require("./models");

initModels(sequelize);

/* application server */
const application = express();

/* enable cors */
application.use(cors());

/* content type */
application.use(express.json());

/* server middlewares */
application.use(authMiddleware());

/* server router */
application.use("/auth", auth);
application.use("/users", users);
application.use("/tasks", tasks);

/* fallback route */
application.use((req, res, next) => {
  return next(new Error("route not found"));
});

/* error handler */
application.use(errorMiddleware());

/* start to listen for requests */
const server = application.listen(config.server.port, () => {
  console.log(`[ server ] <start> listening on port ${config.server.port}`);
});

/* graceful shutdown */
const gracefulShutdown = () => {
  console.log("[ process ] <shutdown> graceful shutdown");

  /* close all connections */
  server.close(async () => {
    console.log("[ server ] <shutdown> closed");

    /* check for sqlite in memory database [ call 'close()' in this situation will throw ]*/
    if (
      config.database.dialect === "sqlite" &&
      config.database.storage === ":memory:"
    ) {
      return;
    }

    /* close database connection */
    sequelize.close().then(() => {
      console.log("[ database ] <shutdown> closed");
    });
  });
};

/* signal handlers */
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
