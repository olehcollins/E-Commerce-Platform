"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRefreshToken = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../utils/jwt");
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookies = req.cookies;
        if (!cookies || !cookies.jwt)
            return res.sendStatus(401); // Unauthorized
        const refreshToken = cookies.jwt;
        console.log(refreshToken === process.env.JWT_REFRESH_TOKEN_SECRET);
        const user = yield User_1.UserModel.findOne({ refreshToken }).exec();
        if (!user)
            return res.sendStatus(403);
        jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (err, decoded) => {
            if (err || !decoded || user.email !== decoded.email)
                return res.sendStatus(403); // Forbidden
            const decodedPayload = decoded;
            console.log(decodedPayload);
            const accessToken = (0, jwt_1.generateAccessToken)(user);
            res.json({ accessToken });
        });
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.handleRefreshToken = handleRefreshToken;
