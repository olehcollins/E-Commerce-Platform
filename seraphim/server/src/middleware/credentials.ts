import { Request, Response, NextFunction } from "express";

const allowedOrigins = ["https://localhost:3500", "http://127.0.0.1:5500"];

export const credentials = (req: Request, res: Response, next: NextFunction) => {
	const origin = req.headers.origin as string | undefined;
	if (origin && allowedOrigins.includes(origin)) {
		res.header("Access-Control-Allow-Credentials", "true");
	}
	next();
};
