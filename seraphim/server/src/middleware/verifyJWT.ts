import jwt, { VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../types/JwtPayload";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (Array.isArray(authHeader)) {
		return res.sendStatus(401); // Authorization header should not be an array
	}

	if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

	const token = authHeader.split(" ")[1];
	jwt.verify(
		token,
		process.env.JWT_REFRESH_TOKEN_SECRET as string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(err: VerifyErrors | null, decoded: JwtPayload | any) => {
			if (err) return res.status(403).json(err); // invalid token
			req.body.email = decoded.email;
			req.body.isAdmin = decoded.isAdmin;
			next();
		}
	);
};
