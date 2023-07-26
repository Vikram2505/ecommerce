const express = require("express");
const connectDB = require("./config/db");
const productRouter = require("./routes/products");

const server = express();

const PORT = 8080;
// middleware
server.use(express.json({ limit: "30mb", extended: true })); //To parse request body
// Connect DB function
connectDB();

server.use("/products", productRouter.router);

server.listen(PORT, () => {
  console.log(`Server is running in development mode on port ${PORT} ✅✅✅`);
});
