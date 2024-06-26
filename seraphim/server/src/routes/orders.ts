import express from "express";
import { createOrder, getOrder, getAllOrders } from "../controllers/ordersController";
import { verifyJWT } from "../middleware/verifyJWT";

const orderRouter = express.Router();

orderRouter.route("/").get(verifyJWT, getAllOrders).post(verifyJWT, createOrder);
orderRouter.route("/:id").get(getOrder);

export default orderRouter;
