"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// export const generateAccessToken = (user: JwtPayload) => {
// 	return jwt.sign(
// 		{
// 			_id: user._id,
// 			name: user.name,
// 			email: user.email,
// 			isAdmin: user.isAdmin,
// 		},
// 		process.env.JWT_ACCESS_TOKEN_SECRET || "somethingsecret",
// 		{
// 			expiresIn: "1d",
// 		}
// 	);
// };
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, process.env.JWT_REFRESH_TOKEN_SECRET || "somethingsecret", {
        expiresIn: "7d",
    });
};
exports.generateRefreshToken = generateRefreshToken;
