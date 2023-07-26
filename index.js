import express from "express";
import connectDB from "./config/db.js";
import productRouter from "./routes/products.js";
import userRouter from "./routes/user.js";
import morgan from "morgan";
import bodyParser from "body-parser";

const server = express();

const PORT = 8080;

// body parser is use to get form value
server.use(bodyParser.json({limit: '50mb'}));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

server.use(morgan("dev")); //to show api hit url in node console

// middleware
server.use(express.json({ limit: "30mb", extended: true })); //To parse request body
// Connect DB function
connectDB();

server.use("/products", productRouter);
server.use("/user", userRouter);

server.listen(PORT, () => {
  console.log(`Server is running in development mode on port ${PORT} ✅✅✅`);
});
