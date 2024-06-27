"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logEvents_1 = require("./logEvents");
const errorHandler = (err, req, res) => {
    (0, logEvents_1.logEvent)(`name: ${err.name}\t msg: ${err.message}`, "errorLog.txt");
    console.error(err.stack);
    res.status(500).send(`error: ${err.message}`);
};
exports.errorHandler = errorHandler;
