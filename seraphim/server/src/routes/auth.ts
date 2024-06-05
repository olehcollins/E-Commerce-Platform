import express from "express";
import { handleLogin } from "../controllers/authController";

export const authRoute = express.Router();

authRoute.route("/").post(handleLogin);
