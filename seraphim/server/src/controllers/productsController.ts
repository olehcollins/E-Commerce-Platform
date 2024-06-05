import ProductModel from "../models/Product";
import { Request, Response } from "express";

const getAllProducts = async (_req: Request, res: Response) => {
	const products = await ProductModel.find();
	if (!products) return res.status(204).json({ message: "No products found" });

	res.status(200).json(products);
};

const createProduct = async (req: Request, res: Response) => {
	if (!req?.body) return res.status(400).send({ message: "product details required" });

	try {
		const newProduct = await ProductModel.create({ ...req.body });
		res.status(201).send({ message: `${req.body.name} created`, newProduct });
	} catch (error) {
		console.error(error);
	}
};

const updateProduct = async (req: Request, res: Response) => {
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

const deleteProduct = async (req: Request, res: Response) => {
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

const getProduct = async (req: Request, res: Response) => {
	if (!req?.params?.id) return res.status(400).json({ message: "product id required" });
	const product = await ProductModel.findOne({ _id: req.params.id }).exec();

	if (!product)
		return res.status(400).json({ message: `Product with ID ${req.params.id} not found` });

	res.status(200).json(product);
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct, getProduct };
