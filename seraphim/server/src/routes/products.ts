import express from "express";
import {
	getAllProducts,
	getProduct,
	updateProduct,
	searchProducts,
} from "../controllers/productsController";
import { verifyJWT } from "../middleware/verifyJWT";

const productRouter = express.Router();

productRouter.route("/search").get(searchProducts);
productRouter.route("/").get(getAllProducts);
productRouter.route("/:id").get(getProduct);
productRouter.route("/:id").put(verifyJWT, updateProduct);

export default productRouter;
