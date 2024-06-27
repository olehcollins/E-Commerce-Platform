"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ordersController_1 = require("../controllers/ordersController");
const verifyJWT_1 = require("../middleware/verifyJWT");
const orderRouter = express_1.default.Router();
orderRouter.route("/").post(verifyJWT_1.verifyJWT, ordersController_1.createOrder).get(verifyJWT_1.verifyJWT, ordersController_1.getAllOrders);
orderRouter.route("/:id").get(verifyJWT_1.verifyJWT, ordersController_1.getOrder);
orderRouter.route("/:id/pay").put(verifyJWT_1.verifyJWT, ordersController_1.updateOrder);
exports.default = orderRouter;
