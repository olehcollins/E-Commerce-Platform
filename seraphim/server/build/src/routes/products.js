"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsController_1 = require("../controllers/productsController");
const verifyJWT_1 = require("../middleware/verifyJWT");
const productRouter = express_1.default.Router();
productRouter.route("/search").get(productsController_1.searchProducts);
productRouter.route("/").get(productsController_1.getAllProducts);
productRouter.route("/:id").get(productsController_1.getProduct);
productRouter.route("/:id").put(verifyJWT_1.verifyJWT, productsController_1.updateProduct);
exports.default = productRouter;
