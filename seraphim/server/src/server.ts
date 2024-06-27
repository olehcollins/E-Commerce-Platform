//packages
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

//routes
import { authRoute } from "./routes/auth";
import { refreshRouter } from "./routes/refresh";
import { logOutRouter } from "./routes/logout";
import { userRouter } from "./routes/user";
import productRouter from "./routes/products";

// custom middleware
import connectDB from "../config/dbConnect";
import corsOptions from "../config/corsOptions";
import { logger } from "./middleware/logEvents";
import { errorHandler } from "./middleware/errorHandler";
import orderRouter from "./routes/orders";
import { keyRouter } from "./routes/key";

const PORT = process.env.PORT || 3500;
const app = express();

connectDB();

//Cors middleware
app.use(cors(corsOptions));

//custom middleware
app.use(logger);

//Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//router
app.use("/users", userRouter);
app.use("/auth", authRoute);
app.use("/refresh", refreshRouter);
app.use("/signout", logOutRouter);
app.use("/orders", orderRouter);
app.use("/keys", keyRouter);

app.use("/products", productRouter);

app.get("/", (_req, res) => {
	res.send("seraphime server");
});

//server errors
app.use(errorHandler);

mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB Atlas successfully!");
	app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
});
