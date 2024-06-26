import { UserModel } from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateRefreshToken } from "../utils/jwt";

export const handleLogin = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password)
		return res.status(400).json({ message: "username and password required" });
	const user = await UserModel.findOne({ email: req.body.email }).exec();

	if (!user)
		return res.status(401).json({ message: `User with email ${req.body.email} not found` });

	if (bcrypt.compareSync(req.body.password, user.password)) {
		const refreshToken = generateRefreshToken(user);

		user.refreshToken = refreshToken;
		const result = await user.save();
		console.log(result);
		// http cookie is not available to js: its more secure
		// secure: true - only serves on https( would be added in production )
		// qnok5evkkxgxam7csskt;

		res.json({
			id: user._id,
			name: user.name,
			email: user.email,
			refreshToken,
			profileImage: user.profileImage,
		});
	} else {
		// console.log(req.body);
		res.sendStatus(401);
	}
};
