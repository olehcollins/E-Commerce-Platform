"use strict";
// import mongoose from "mongoose";
// import { Product } from "../types/Products";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const typegoose_1 = require("@typegoose/typegoose");
class Review {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Review.prototype, "customer", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Review.prototype, "caption", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Review.prototype, "stars", void 0);
class Product {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "countInStock", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "brand", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [Review], default: [] }),
    __metadata("design:type", Array)
], Product.prototype, "reviews", void 0);
// Create the Product model
const ProductModel = (0, typegoose_1.getModelForClass)(Product);
exports.default = ProductModel;
