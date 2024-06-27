"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentials = void 0;
const allowedOrigins = ["https://localhost:3500", "http://127.0.0.1:5500"];
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
};
exports.credentials = credentials;
