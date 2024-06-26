import express from "express";
import { createOrder, getOrder, getAllOrders } from "../controllers/ordersController";
import { verifyJWT } from "../middleware/verifyJWT";

const orderRouter = express.Router();

orderRouter.route("/").post(verifyJWT, createOrder).get(verifyJWT, getAllOrders);
orderRouter.route("/:id").get(verifyJWT, getOrder);

export default orderRouter;
