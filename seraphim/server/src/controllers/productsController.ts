import ProductModel from "../models/Product";
import { Request, Response } from "express";

export const getAllProducts = async (_req: Request, res: Response) => {
	const products = await ProductModel.find();
	if (!products) return res.status(204).json({ message: "No products found" });

	res.status(200).json(products);
};

export const searchProducts = async (req: Request, res: Response) => {
	const { searchTerm } = req.query;
	if (!searchTerm || typeof searchTerm !== "string") {
		return res.status(400).json({ message: "Invalid search term" });
	}
	try {
		const regex = new RegExp(searchTerm, "i"); // Case-insensitive search

		const products = await ProductModel.find({
			$or: [
				{ name: { $regex: regex } },
				{ category: { $regex: regex } },
				{ description: { $regex: regex } },
			],
		});

		if (!products) return res.status(204).json({ message: "No products found" });
		console.log(products);
		res.status(200).json(products);
	} catch (error) {
		console.error("Error searching products:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const createProduct = async (req: Request, res: Response) => {
	if (!req?.body) return res.status(400).send({ message: "product details required" });

	try {
		const newProduct = await ProductModel.create({ ...req.body });
		res.status(201).send({ message: `${req.body.name} created`, newProduct });
	} catch (error) {
		console.error(error);
	}
};

export const updateProduct = async (req: Request, res: Response) => {
	if (!req?.body) return res.status(400).json({ message: "product details required" });

	try {
		// console.log(req.body);
		// return;
		const updatedProduct = await ProductModel.findByIdAndUpdate(req.body._id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!updatedProduct) {
			return res.status(404).send({ message: "Product not found" });
		}
		res.status(200).json({ "updated product": updatedProduct });
	} catch (error) {
		console.error(error);
	}
};

export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

		if (!deletedProduct) {
			return res.status(404).send({ message: "Product not found" });
		}

		res.status(200).send({ message: "Product deleted successfully", product: deletedProduct });
	} catch (error) {
		res.status(500).send({ message: "Error deleting product", error });
	}
};

export const getProduct = async (req: Request, res: Response) => {
	if (!req?.params?.id) return res.status(400).json({ message: "product id required" });
	const product = await ProductModel.findOne({ _id: req.params.id }).exec();

	if (!product)
		return res.status(400).json({ message: `Product with ID ${req.params.id} not found` });

	res.status(200).json(product);
};
