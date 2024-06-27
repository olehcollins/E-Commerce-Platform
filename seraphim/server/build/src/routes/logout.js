"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOutRouter = void 0;
const express_1 = require("express");
exports.logOutRouter = (0, express_1.Router)();
const logoutController_1 = require("../controllers/logoutController");
exports.logOutRouter.post("/", logoutController_1.handleLogout);
