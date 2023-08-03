import express from "express";
import connectDB from "./config/db.js";
import productRouter from "./routes/products.js";
import userRouter from "./routes/user.js";
import userChatRouter from "./routes/userChat.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import UserChatSocket from "./config/UserChatSocket.js";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

const randomId = () => crypto.randomBytes(8).toString("hex");
 console.log(randomId);
const app = express();

const PORT = 8080;
app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "*"],
    methods: ["GET", "POST"],
  },
});

const onConnection = (socket) => {
  UserChatSocket(socket, io);
  
};

io.use((socket, next) => {
  if (socket.handshake.auth.token) {
    const { token } = socket.handshake.auth;
    const sessionId = socket.handshake.auth.sessionId;
    // console.log(socket.handshake,'sessionid');
    jwt.verify(token, "test", function (err, decoded) {
      // console.log(decoded,'decoded');
      if (err) return next(new Error("Authentication error"));
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
});

io.on("connection", onConnection);

// io.on("connection", (socket) => {
// });  

// body parser is use to get form value
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(morgan("dev")); //to show api hit url in node console

// middleware
app.use(express.json({ limit: "30mb", extended: true })); //To parse request body
// Connect DB function
connectDB();

app.use("/products", productRouter);
app.use("/user", userRouter);
app.use("/chat", userChatRouter);

httpServer.listen(PORT, () => {
  console.log(`Server is running in development mode on port ${PORT} ✅✅✅`);
});
