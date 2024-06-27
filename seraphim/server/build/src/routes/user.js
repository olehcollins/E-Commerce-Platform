"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const verifyRoles_1 = require("../middleware/verifyRoles");
const verifyJWT_1 = require("../middleware/verifyJWT");
exports.userRouter = express_1.default.Router();
exports.userRouter.route("/admin").get(verifyJWT_1.verifyJWT, verifyRoles_1.verifyRoles, usersController_1.getAllUsers);
exports.userRouter.route("/admin/:email").get(verifyJWT_1.verifyJWT, verifyRoles_1.verifyRoles, usersController_1.getUser);
exports.userRouter
    .route("/customer")
    .post(usersController_1.createUser)
    .put(verifyJWT_1.verifyJWT, usersController_1.updateUser)
    .delete(verifyJWT_1.verifyJWT, usersController_1.deleteUser);
