import { OrderModel } from "../models/Order";
import { Request, Response } from "express";
import { UserModel } from "../models/User";

export const getAllOrders = async (req: Request, res: Response) => {
	const orders = await OrderModel.find({ customer: req.body.customer });
	if (!orders) return res.status(204).json({ message: "No orders found" });

	res.status(200).json(orders);
};

export const createOrder = async (req: Request, res: Response) => {
	if (!req?.body) return res.status(400).send({ message: "order details required" });
	if (req.body.orderItems.length === 0) res.status(400).send({ message: "Cart is empty" });
	const user = await UserModel.findOne({ email: req.body.email }).exec();
	console.log(user);
	try {
		const newOrder = await OrderModel.create({
			orderItems: req.body.orderItems,
			shippingAddress: req.body.shippingAddress,
			customer: user,
			paymentMethod: req.body.paymentMethod,
			itemsPrice: req.body.itemsPrice,
			shippingPrice: req.body.shippingPrice,
			taxPrice: req.body.taxPrice,
			totalPrice: req.body.totalPrice,
		});

		res.status(201).send({ message: `new order created`, order: newOrder });
	} catch (error) {
		console.error(error);
	}
};

export const getOrder = async (req: Request, res: Response) => {
	if (!req?.params?.id) return res.status(400).json({ message: "order id required" });
	const order = await OrderModel.findById(req.params.id).exec();
	console.log(order);

	if (!order) return res.status(404).json({ message: `Order with ID ${req.params.id} not found` });

	res.status(200).json(order);
};

export const updateOrder = async (req: Request, res: Response) => {
	if (!req?.params?.id) return res.status(400).json({ message: "order id required" });
	const order = await OrderModel.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = new Date(Date.now());
		order.paymentResult = {
			paymentId: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.email_address,
		};
		const updatedOrder = await order.save();

		res.send({ order: updatedOrder, message: "Order Paid Successfully" });
	} else {
		res.status(404).json({ message: "Order Not Found" });
	}
};
