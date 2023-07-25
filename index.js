const express = require ('express');
const connectDB = require('./config/db');
const { createProduct } = require('./controller/Product.js');
const server = express();

// middleware
server.use(express.json())   //To parse request body
// Connect DB function
connectDB();

server.post("/products",createProduct)

server.listen(8080, () => {
    console.log("Server started")
})