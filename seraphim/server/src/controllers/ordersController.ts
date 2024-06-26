import { OrderModel } from "../models/Order";
import { Request, Response } from "express";
import { Product } from "../types/Products";

export const getAllOrders = async (_req: Request, res: Response) => {
	const orders = await OrderModel.find();
	if (!orders) return res.status(204).json({ message: "No orders found" });

	res.status(200).json(orders);
};

export const createOrder = async (req: Request, res: Response) => {
	if (!req?.body) return res.status(400).send({ message: "order details required" });

	try {
		const newOrder = await OrderModel.create({
			orderItems: req.body.orderItems.map((x: Product) => ({
				...x,
				product: x._id,
			})),
			shippingAddress: req.body.shippingAddress,
			paymentMethod: req.body.paymentMethod,
			itemsPrice: req.body.itemsPrice,
			shippingPrice: req.body.shippingPrice,
			taxPrice: req.body.taxPrice,
			totalPrice: req.body.totalPrice,
			user: req.user._id,
		});
		res.status(201).send({ message: `new order created`, newOrder });
	} catch (error) {
		console.error(error);
	}
};

export const getOrder = async (req: Request, res: Response) => {
	if (!req?.params?.id) return res.status(400).json({ message: "order id required" });
	const order = await OrderModel.findOne({ _id: req.params.id }).exec();

	if (!order) return res.status(400).json({ message: `Order with ID ${req.params.id} not found` });

	res.status(200).json(order);
};
