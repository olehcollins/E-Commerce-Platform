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
const Users_1 = require("../data/Users");
const Product_1 = __importDefault(require("../models/Product"));
const User_1 = require("../models/User");
const Phones_1 = require("../data/Phones");
const Laptops_1 = require("../data/Laptops");
const Ipads_1 = require("../data/Ipads");
const PCs_1 = require("../data/PCs");
const data = [...Phones_1.Phones, ...Ipads_1.Ipads, ...Laptops_1.Laptops, ...PCs_1.PCs];
const seedProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Clear existing products
        yield Product_1.default.deleteMany();
        console.log("Products data cleared");
        // Insert sample products
        yield Product_1.default.insertMany(data);
        console.log("Sample products seeded successfully");
        yield User_1.UserModel.deleteMany();
        console.log("Users cleared");
        // Insert sample products
        yield User_1.UserModel.insertMany(Users_1.sampleUsers);
        console.log("Users seeded successfully");
    }
    catch (err) {
        console.error("Error seeding products or users :", err);
    }
});
module.exports = { seedProducts };
