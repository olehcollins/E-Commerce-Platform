"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshRouter = void 0;
const express_1 = __importDefault(require("express"));
const refreshTokenController_1 = require("../controllers/refreshTokenController");
exports.refreshRouter = express_1.default.Router();
exports.refreshRouter.get("/", refreshTokenController_1.handleRefreshToken);
