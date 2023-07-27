import { StoreChat } from "../controller/UserChat.js";

const UserChatSocket = (socket, io) => {
  let users = 0;
  let roomNo = 1;

  socket.emit("connection", socket.id);

  console.log(`User Connected: ${socket.id}`);

  users++;

  socket.emit("new_user_connect", "Hello, Welcome");
  // io.sockets.emit("global_event","message to all")  //it is used to global broadcast
  socket.broadcast.emit("new_user_connect", users + " users connected!");

  socket.join("Room -" + roomNo);
  io.sockets
    .in("Room -" + roomNo)
    .emit("connectionRoom", "you are connected to room no " + roomNo);

  // Event fire when user join chat room
  socket.on("join_room", (data) => {
    socket.join(data);
    socket.emit("user_join", `User with ID: ${socket.id} joined room: ${data}`);
  });

  // custom event received form user side
  socket.on("send_message", async (data) => {    
    let userData = { ...data, room: socket.decoded.id };
    StoreChat(userData);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    socket.emit("disconnected"), socket.id;
    users--;
    socket.broadcast.emit("new_user_connect", users + " users connected!");
  });
};

export default UserChatSocket;
