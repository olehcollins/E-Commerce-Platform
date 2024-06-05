import { UserModel } from "../models/User";
import { Request, Response } from "express";
import { generateRefreshToken } from "../utils/jwt";
import bcrypt from "bcryptjs";

const getAllUsers = async (_req: Request, res: Response) => {
	const users = await UserModel.find();
	if (!users) return res.status(204).json({ message: "No users found" });

	res.status(200).json(users);
};

const createUser = async (req: Request, res: Response) => {
	const { email, password, name, profileImage } = req.body;
	if (!email || !password || !name)
		return res.status(400).json({ message: "name, email and password required" });
	const duplicate = await UserModel.findOne({ email: email }).exec();
	if (duplicate) return res.sendStatus(409);
	try {
		const hashedPwd = await bcrypt.hash(password, 10);

		const result = await UserModel.create({
			name,
			email,
			password: hashedPwd,
			profileImage,
		});
		const refreshToken = generateRefreshToken(result);
		// console.log(result);

		res.status(201).json({ result, refreshToken });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const updateUser = async (req: Request, res: Response) => {
	if (!req?.body) return res.status(400).json({ message: "user details required" });
	try {
		let newInfo = { ...req.body };
		if (!req.body.profileImage) {
			const user = await UserModel.findOne({ email: req.body.email }).exec();
			newInfo = { ...newInfo, profileImage: user?.profileImage };
		}
		const updatedUser = await UserModel.findByIdAndUpdate(req.body.id, newInfo, {
			runValidators: true,
		});

		if (!updatedUser) {
			return res.status(404).send({ message: "User not found" });
		}
		const user = await UserModel.findOne({ _id: req.body.id }).exec();
		if (!user) return res.status(404).send({ message: "User not found" });
		res.status(200).json({
			id: user._id,
			name: user.name,
			email: user.email,
			refreshToken: user.refreshToken,
			profileImage: user.profileImage,
		});
	} catch (error) {
		// console.error(error);
		res.sendStatus(500);
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

		if (!deletedUser) {
			return res.status(404).send({ message: "User not found" });
		}

		res.status(200).send({ message: "User deleted successfully", user: deletedUser });
	} catch (error) {
		res.status(500).send({ message: "Error deleting user", error });
	}
};
const getUser = async (req: Request, res: Response) => {
	const { email } = req.body;
	if (!email) return res.status(400).json({ message: "email required" });
	const user = await UserModel.findOne({ email: req.body.email }).exec();

	if (!user)
		return res.status(401).json({ message: `User with email ${req.body.email} not found` });

	res.json({ user: user });
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser, getUser };
