"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const allowedOrigins: string[] = ["*"];
const corsOptions = {
    // origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // 	if (!origin || allowedOrigins.indexOf(origin) !== -1) {
    // 		callback(null, true);
    // 	} else {
    // 		callback(new Error("Not allowed by CORS"));
    // 	}
    // },
    origin: "https://swiftshop-203lfgixu-oleh-collins-projects.vercel.app",
    optionsSuccessStatus: 200,
};
exports.default = corsOptions;
