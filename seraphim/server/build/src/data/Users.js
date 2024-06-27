"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.sampleUsers = [
    {
        name: "Oleh",
        email: "collins@gmail.com",
        password: bcryptjs_1.default.hashSync("secret"),
        isAdmin: true,
    },
    {
        name: "John",
        email: "locklocke@gmail.com",
        password: bcryptjs_1.default.hashSync("secret"),
        isAdmin: false,
    },
];
