import mongoose from "mongoose";
import { Product } from "../types/Products";

// Define the product schema using the existing Product type
const productSchema = new mongoose.Schema<Product>({
	name: { type: String, required: true },
	category: { type: String, required: true },
	image: { type: String, required: true },
	price: { type: Number, required: true },
	countInStock: { type: Number, required: true },
	brand: { type: String, required: true },
	description: { type: String, required: true },
	reviews: [
		{
			customer: { type: String, required: true },
			caption: { type: String, required: true },
			stars: { type: Number, required: true },
		},
	],
});

// Create the Product model
const ProductModel = mongoose.model<Product>("Product", productSchema);

export default ProductModel;
