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
exports.getUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getAllUsers = void 0;
const User_1 = require("../models/User");
const jwt_1 = require("../utils/jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.UserModel.find();
    if (!users)
        return res.status(204).json({ message: "No users found" });
    res.status(200).json(users);
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, profileImage } = req.body;
    if (!email || !password || !name)
        return res.status(400).json({ message: "name, email and password required" });
    const duplicate = yield User_1.UserModel.findOne({ email: email }).exec();
    if (duplicate)
        return res.sendStatus(409);
    try {
        const hashedPwd = yield bcryptjs_1.default.hash(password, 10);
        const result = yield User_1.UserModel.create({
            name,
            email,
            password: hashedPwd,
            profileImage,
        });
        const refreshToken = (0, jwt_1.generateRefreshToken)(result);
        // console.log(result);
        res.status(201).json({ result, refreshToken });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(req === null || req === void 0 ? void 0 : req.body))
        return res.status(400).json({ message: "user details required" });
    try {
        let newInfo = Object.assign({}, req.body);
        if (!req.body.profileImage) {
            const user = yield User_1.UserModel.findOne({ email: req.body.email }).exec();
            newInfo = Object.assign(Object.assign({}, newInfo), { profileImage: user === null || user === void 0 ? void 0 : user.profileImage });
        }
        const updatedUser = yield User_1.UserModel.findByIdAndUpdate(req.body.id, newInfo, {
            runValidators: true,
        });
        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        const user = yield User_1.UserModel.findOne({ _id: req.body.id }).exec();
        if (!user)
            return res.status(404).send({ message: "User not found" });
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            refreshToken: user.refreshToken,
            profileImage: user.profileImage,
        });
    }
    catch (error) {
        // console.error(error);
        res.sendStatus(500);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield User_1.UserModel.findByIdAndDelete(req.body.id);
        if (!deletedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ message: "User deleted successfully", user: deletedUser });
    }
    catch (error) {
        res.status(500).send({ message: "Error deleting user", error });
    }
});
exports.deleteUser = deleteUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email)
        return res.status(400).json({ message: "email required" });
    const user = yield User_1.UserModel.findOne({ email: req.body.email }).exec();
    if (!user)
        return res.status(401).json({ message: `User with email ${req.body.email} not found` });
    res.json({ user: user });
});
exports.getUser = getUser;
