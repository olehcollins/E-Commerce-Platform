import mongoose from "mongoose";
// import { seedProducts } from "../src/seeds/seed.ts";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URI!);

		// seedProducts();
	} catch (error) {
		console.error("Error connecting to MongoDB Atlas:", error);
	}
};

export default connectDB;
