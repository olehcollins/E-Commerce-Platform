"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.getOrder = exports.createOrder = exports.getAllOrders = void 0;
const Order_1 = require("../models/Order");
const User_1 = require("../models/User");
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_1.OrderModel.find({ customer: req.body.customer });
    if (!orders)
        return res.status(204).json({ message: "No orders found" });
    res.status(200).json(orders);
});
exports.getAllOrders = getAllOrders;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(req === null || req === void 0 ? void 0 : req.body))
        return res.status(400).send({ message: "order details required" });
    if (req.body.orderItems.length === 0)
        res.status(400).send({ message: "Cart is empty" });
    const user = yield User_1.UserModel.findOne({ email: req.body.email }).exec();
    console.log(user);
    try {
        const newOrder = yield Order_1.OrderModel.create({
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
    }
    catch (error) {
        console.error(error);
    }
});
exports.createOrder = createOrder;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id))
        return res.status(400).json({ message: "order id required" });
    const order = yield Order_1.OrderModel.findById(req.params.id).exec();
    console.log(order);
    if (!order)
        return res.status(404).json({ message: `Order with ID ${req.params.id} not found` });
    res.status(200).json(order);
});
exports.getOrder = getOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (!((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id))
        return res.status(400).json({ message: "order id required" });
    const order = yield Order_1.OrderModel.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = new Date(Date.now());
        order.paymentResult = {
            paymentId: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };
        const updatedOrder = yield order.save();
        res.send({ order: updatedOrder, message: "Order Paid Successfully" });
    }
    else {
        res.status(404).json({ message: "Order Not Found" });
    }
});
exports.updateOrder = updateOrder;
