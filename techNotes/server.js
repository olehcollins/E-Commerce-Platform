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
  const PORT = process.env.PORT || 3500;

  app.use(logger);
  // will make our api accessible to everyone
  app.use(cors(corsOptions));
  // express.static middleware: use the static files located in the public folder
  app.use("/", express.static(path.join(__dirname, "public"))); // another way to write this is app.use(express.static('public'))
  app.use(express.json());

  app.use(cookieParser());

  // use the routes from the root.js file
  app.use("/", require("./routes/root.js"));
  // this is the catchall middleware for all request that were not handled by the previous middleware
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

  app.listen(PORT, () =>
    console.log(
      chalk.magentaBright("Server running on port", chalk.blueBright(PORT))
    )
  );
};

startServer();
