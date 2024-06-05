import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fsPromises from "fs/promises";
import fs from "fs";
import { Request, Response, NextFunction } from "express";
import path from "path";

export const logEvent = async (message: string, logName: string) => {
	const dateTime = `${format(new Date(), "dd/MM/yyyy-HH:mm:ss")}`;
	const logItem = `date-time: ${dateTime}\t id: ${uuid()}\t ${message}\n`;
	const chalk = (await import("chalk")).default;

	try {
		if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
			fs.mkdir(path.join(__dirname, "..", "logs"), (err) => {
				err ? console.log(err) : console.log(chalk.blueBright("logs Directory created"));
			});
		}
		await fsPromises.appendFile(path.join(__dirname, "..", "logs", logName), logItem);
		console.log(chalk.cyanBright(logItem));
	} catch (error) {
		console.log(error);
	}
};

export const logger = (req: Request, res: Response, next: NextFunction) => {
	const origin = req.headers["origin"] || "unknown";
	logEvent(`method: ${req.method}\t origin: ${origin}\t url: ${req.url}`, "reqLog.txt");
	console.log(`method: ${req.method}, url: ${req.url}`);
	next();
};
