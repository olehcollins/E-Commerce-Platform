"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//packages
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
//routes
const auth_1 = require("./routes/auth");
// import { refreshRouter } from "./routes/refresh";
const logout_1 = require("./routes/logout");
const user_1 = require("./routes/user");
const products_1 = __importDefault(require("./routes/products"));
// custom middleware
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
const corsOptions_1 = __importDefault(require("../config/corsOptions"));
const logEvents_1 = require("./middleware/logEvents");
const errorHandler_1 = require("./middleware/errorHandler");
const orders_1 = __importDefault(require("./routes/orders"));
const key_1 = require("./routes/key");
const PORT = process.env.PORT || 3500;
const app = (0, express_1.default)();
(0, dbConnect_1.default)();
//Cors middleware
app.use((0, cors_1.default)(corsOptions_1.default));
//custom middleware
app.use(logEvents_1.logger);
//Body parsing middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
//router
app.use("/users", user_1.userRouter);
app.use("/auth", auth_1.authRoute);
// app.use("/refresh", refreshRouter);
app.use("/signout", logout_1.logOutRouter);
app.use("/orders", orders_1.default);
app.use("/keys", key_1.keyRouter);
app.use("/products", products_1.default);
app.get("/", (_req, res) => {
    res.send("seraphime server");
});
//server errors
app.use(errorHandler_1.errorHandler);
mongoose_1.default.connection.once("open", () => {
    console.log("Connected to MongoDB Atlas successfully!");
    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
});
