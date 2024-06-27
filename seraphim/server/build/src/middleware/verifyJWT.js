"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // console.log(authHeader);
    // return;
    if (Array.isArray(authHeader)) {
        return res.sendStatus(401); // Authorization header should not be an array
    }
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer ")))
        return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (err, decoded) => {
        if (err)
            return res.status(403).json(err); // invalid token
        req.body.email = decoded.email;
        req.body.isAdmin = decoded.isAdmin;
        req.body.customer = decoded;
        next();
    });
};
exports.verifyJWT = verifyJWT;
