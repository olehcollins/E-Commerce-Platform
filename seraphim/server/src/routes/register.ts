import express from "express";
export const registerRouter = express.Router();
import { handleNewUser } from "../controllers/registerController";

registerRouter.post("/", handleNewUser);
