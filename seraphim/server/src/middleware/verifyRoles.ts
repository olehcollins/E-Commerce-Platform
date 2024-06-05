import { Request, Response, NextFunction } from "express";

export const verifyRoles = (req: Request, res: Response, next: NextFunction) => {
	const { isAdmin } = req.body;
	if (!isAdmin) return res.sendStatus(401);
	next();
};
