import { UserModel } from "../models/User";
import { Request, Response } from "express";

export const handleLogout = async (req: Request, res: Response) => {
	// on client delete access token

	const email = req.body.email;

	// find user with the refresh token
	const user = await UserModel.findOne({ email }).exec();

	if (!user) {
		return res.sendStatus(204);
	}

	// delete refresh token
	user.refreshToken = "";
	const result = await user.save();
	console.log(result);

	res.status(201).json(`user ${user.name} logged out`);
};
