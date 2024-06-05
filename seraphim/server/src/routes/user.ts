import express from "express";
import {
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
	createUser,
} from "../controllers/usersController";
import { verifyRoles } from "../middleware/verifyRoles";
import { verifyJWT } from "../middleware/verifyJWT";

export const userRouter = express.Router();

userRouter.route("/admin").get(verifyJWT, verifyRoles, getAllUsers);
userRouter.route("/admin/:email").get(verifyJWT, verifyRoles, getUser);

userRouter
	.route("/customer")
	.post(createUser)
	.put(verifyJWT, updateUser)
	.delete(verifyJWT, deleteUser);
