import { logEvent } from "./logEvents";
import { Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response) => {
	logEvent(`name: ${err.name}\t msg: ${err.message}`, "errorLog.txt");
	console.error(err.stack);
	res.status(500).send(err.message);
};
