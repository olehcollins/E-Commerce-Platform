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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.searchProducts = exports.getAllProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getAllProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_1.default.find();
    if (!products)
        return res.status(204).json({ message: "No products found" });
    res.status(200).json(products);
});
exports.getAllProducts = getAllProducts;
const searchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    if (!searchTerm || typeof searchTerm !== "string") {
        return res.status(400).json({ message: "Invalid search term" });
    }
    try {
        const regex = new RegExp(searchTerm, "i"); // Case-insensitive search
        const products = yield Product_1.default.find({
            $or: [
                { name: { $regex: regex } },
                { category: { $regex: regex } },
                { description: { $regex: regex } },
            ],
        });
        if (!products)
            return res.status(204).json({ message: "No products found" });
        console.log(products);
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.searchProducts = searchProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(req === null || req === void 0 ? void 0 : req.body))
        return res.status(400).send({ message: "product details required" });
    try {
        const newProduct = yield Product_1.default.create(Object.assign({}, req.body));
        res.status(201).send({ message: `${req.body.name} created`, newProduct });
    }
    catch (error) {
        console.error(error);
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(req === null || req === void 0 ? void 0 : req.body))
        return res.status(400).json({ message: "product details required" });
    try {
        // console.log(req.body);
        // return;
        const updatedProduct = yield Product_1.default.findByIdAndUpdate(req.body._id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedProduct) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).json({ "updated product": updatedProduct });
    }
    catch (error) {
        console.error(error);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield Product_1.default.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send({ message: "Product deleted successfully", product: deletedProduct });
    }
    catch (error) {
        res.status(500).send({ message: "Error deleting product", error });
    }
});
exports.deleteProduct = deleteProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id))
        return res.status(400).json({ message: "product id required" });
    const product = yield Product_1.default.findOne({ _id: req.params.id }).exec();
    if (!product)
        return res.status(400).json({ message: `Product with ID ${req.params.id} not found` });
    res.status(200).json(product);
});
exports.getProduct = getProduct;
