// import { UserModel } from "../models/User";
// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import { generateRefreshToken } from "../utils/jwt";

// export const handleNewUser = async (req: Request, res: Response) => {
// 	const { email, pwd, name } = req.body;
// 	if (!email || !pwd || !name)
// 		return res.status(400).json({ message: "name, email and password required" });
// 	const duplicate = await UserModel.findOne({ email: email }).exec();
// 	if (duplicate) return res.sendStatus(409);
// 	try {
// 		const hashedPwd = await bcrypt.hash(pwd, 10);

// 		const result = await UserModel.create({
// 			name,
// 			email,
// 			password: hashedPwd,
// 		});
// 		const refreshToken = generateRefreshToken(result);
// 		console.log(result);

// 		res.status(201).json({ result, refreshToken });
// 	} catch (error) {
// 		res.status(500).json({ message: error });
// 	}
// };
