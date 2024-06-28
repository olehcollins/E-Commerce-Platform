"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins = [
    "https://swiftshop-mu.vercel.app",
    "https://swiftshop-203lfgixu-oleh-collins-projects.vercel.app",
    "https://swiftshop-eight.vercel.app",
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    // origin: "https://swiftshop-203lfgixu-oleh-collins-projects.vercel.app",
    optionsSuccessStatus: 200,
};
exports.default = corsOptions;
