import { User } from "../models/User";
import bcrypt from "bcryptjs";

export const sampleUsers: User[] = [
	{
		name: "Oleh",
		email: "collins@gmail.com",
		password: bcrypt.hashSync("secret"),
		isAdmin: true,
	},
	{
		name: "John",
		email: "locklocke@gmail.com",
		password: bcrypt.hashSync("secret"),
		isAdmin: false,
	},
];
