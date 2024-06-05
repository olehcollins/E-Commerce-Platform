import { Router } from "express";
export const logOutRouter = Router();
import { handleLogout } from "../controllers/logoutController";

logOutRouter.post("/", handleLogout);
