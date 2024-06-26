// import mongoose from "mongoose";
// import { Product } from "../types/Products";

// // Define the product schema using the existing Product type
// const productSchema = new mongoose.Schema<Product>({
// 	name: { type: String, required: true },
// 	category: { type: String, required: true },
// 	image: { type: String, required: true },
// 	price: { type: Number, required: true },
// 	countInStock: { type: Number, required: true },
// 	brand: { type: String, required: true },
// 	description: { type: String, required: true },
// 	reviews: [
// 		{
// 			customer: { type: String, required: true },
// 			caption: { type: String, required: true },
// 			stars: { type: Number, required: true },
// 		},
// 	],
// });

// // Create the Product model
// const ProductModel = mongoose.model<Product>("Product", productSchema);

// export default ProductModel;
import { prop, getModelForClass } from "@typegoose/typegoose";

class Review {
	@prop({ required: true })
	public customer!: string;

	@prop({ required: true })
	public caption!: string;

	@prop({ required: true })
	public stars!: number;
}

class Product {
	@prop({ required: true })
	public name!: string;

	@prop({ required: true })
	public category!: string;

	@prop({ required: true })
	public image!: string;

	@prop({ required: true })
	public price!: number;

	@prop({ required: true })
	public countInStock!: number;

	@prop({ required: true })
	public brand!: string;

	@prop({ required: true })
	public description!: string;

	@prop({ type: () => [Review], default: [] })
	public reviews!: Review[];
}

// Create the Product model
const ProductModel = getModelForClass(Product);

export default ProductModel;
