require("dotenv").config();

const startServer = async () => {
  const chalk = (await import("chalk")).default;

  const express = require("express");
  const app = express();
  const path = require("path");
  const { logger } = require("./middleware/logger.js");
  const errorHandler = require("./middleware/errorHandler.js");
  const cookieParser = require("cookie-parser");
  const cors = require("cors");
  const corsOptions = require("./config/corsOptions.js");
  const connectDB = require("./config/dbConnection");
  const mongoose = require("mongoose");
  const { logEvents } = require("./middleware/logger.js");
  const rootRoute = require("./routes/root.js");
  const userRoutes = require("./routes/userRoutes.js");
  const PORT = process.env.PORT || 3500;

  console.log(process.env.NODE_ENV);

  connectDB();

  app.use(logger);
  // will make our api accessible to everyone
  app.use(cors(corsOptions));
  // express.static middleware: use the static files located in the public folder
  app.use("/", express.static(path.join(__dirname, "public"))); // another way to write this is app.use(express.static('public'))
  app.use(express.json());

  app.use(cookieParser());

  // use the routes from the root.js file
  app.use("/", rootRoute);
  // this is the catchall middleware for all request that were not handled by the previous middleware
  app.use("/users", userRoutes);

  app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "views/404.html"));
    } else if (req.accepts("json")) {
      res.json({ message: "404 Not Found" });
    } else {
      res.type("txt").send("404 Not Found");
    }
  });

  app.use(errorHandler);

  mongoose.connection.once("open", () => {
    console.log(chalk.blueBright("Connected to MongoDB"));
    app.listen(PORT, () =>
      console.log(
        chalk.magentaBright("Server running on port", chalk.blueBright(PORT))
      )
    );
  });
  mongoose.connection.on("error", (err) => {
    console.log(err);
    logEvents(
      `${err.no}: ${err.code}\t ${err.syscall}\t ${err.hostname}`,
      "mongoErrlog.log"
    );
  });
};

startServer();
