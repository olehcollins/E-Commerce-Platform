// import { UserModel } from "../models/User";
// import jwt, { VerifyErrors } from "jsonwebtoken";
// import { Request, Response } from "express";
// // import { generateAccessToken } from "../utils/jwt";
// import { JwtPayload } from "../types/JwtPayload";

// export const handleRefreshToken = async (req: Request, res: Response) => {
// 	try {
// 		const cookies = req.cookies;
// 		if (!cookies || !cookies.jwt) return res.sendStatus(401); // Unauthorized

// 		const refreshToken = cookies.jwt;
// 		console.log(refreshToken === process.env.JWT_REFRESH_TOKEN_SECRET);

// 		const user = await UserModel.findOne({ refreshToken }).exec();
// 		if (!user) return res.sendStatus(403);

// 		jwt.verify(
// 			refreshToken,
// 			process.env.JWT_REFRESH_TOKEN_SECRET as string,
// 			// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 			(err: VerifyErrors | null, decoded: JwtPayload | any) => {
// 				if (err || !decoded || user.email !== decoded.email) return res.sendStatus(403); // Forbidden
// 				const decodedPayload = decoded as JwtPayload;
// 				console.log(decodedPayload);
// 				const accessToken = generateAccessToken(user);
// 				res.json({ accessToken });
// 			}
// 		);
// 	} catch (error) {
// 		console.error(error);
// 		res.sendStatus(500);
// 	}
// };
