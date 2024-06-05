import { sampleUsers } from "../data/Users";
import ProductModel from "../models/Product";
import { UserModel } from "../models/User";
import { Phones } from "../data/Phones";
import { Laptops } from "../data/Laptops";
import { Ipads } from "../data/Ipads";
import { PCs } from "../data/PCs";

const data = [...Phones, ...Ipads, ...Laptops, ...PCs];

const seedProducts = async () => {
	try {
		// Clear existing products
		await ProductModel.deleteMany();
		console.log("Products data cleared");
		// Insert sample products
		await ProductModel.insertMany(data);
		console.log("Sample products seeded successfully");

		await UserModel.deleteMany();
		console.log("Users cleared");
		// Insert sample products
		await UserModel.insertMany(sampleUsers);
		console.log("Users seeded successfully");
	} catch (err) {
		console.error("Error seeding products or users :", err);
	}
};

module.exports = { seedProducts };
