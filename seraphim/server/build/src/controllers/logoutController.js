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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogout = void 0;
const User_1 = require("../models/User");
const handleLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // on client delete access token
    const email = req.body.email;
    // find user with the refresh token
    const user = yield User_1.UserModel.findOne({ email }).exec();
    if (!user) {
        return res.sendStatus(204);
    }
    // delete refresh token
    user.refreshToken = "";
    const result = yield user.save();
    console.log(result);
    res.status(201).json(`user ${user.name} logged out`);
});
exports.handleLogout = handleLogout;
