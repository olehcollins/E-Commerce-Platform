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
exports.handleLogin = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "username and password required" });
    const user = yield User_1.UserModel.findOne({ email: req.body.email }).exec();
    if (!user)
        return res.status(401).json({ message: `User with email ${req.body.email} not found` });
    if (bcryptjs_1.default.compareSync(req.body.password, user.password)) {
        const refreshToken = (0, jwt_1.generateRefreshToken)(user);
        user.refreshToken = refreshToken;
        const result = yield user.save();
        console.log(result);
        // http cookie is not available to js: its more secure
        // secure: true - only serves on https( would be added in production )
        // qnok5evkkxgxam7csskt;
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            refreshToken,
            profileImage: user.profileImage,
        });
    }
    else {
        // console.log(req.body);
        res.sendStatus(401);
    }
});
exports.handleLogin = handleLogin;
