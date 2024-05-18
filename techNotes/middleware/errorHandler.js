const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\tmethod:${req.method}\turl:${req.url}\torigin:${req.headers.origin}`,
    "errLog.log"
  );
  console.log(err.stack);

  const status = req.statusCode ? res.statusCode : 500; //server error

  res.status(status);

  res.json({ message: err.message });
};

module.exports = errorHandler;
