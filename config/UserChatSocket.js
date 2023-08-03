import { StoreChat } from "../controller/UserChat.js";
import  InMemorySessionStore from "../_helpers/sessionStore.js";

const sessionStore = new InMemorySessionStore();

const UserChatSocket = (socket, io) => {
  // let users = 0;
  let roomNo = 1;

  socket.emit("connection", socket.id);

  console.log(`User Connected: ${socket.id}`);

  // console.log(socket.decoded,'socket');
  // emit session details
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  // join the "userID" room
  socket.join(socket.userID);

  // fetch existing users
  const users = [];
  sessionStore.findAllSessions().forEach((session) => {
    console.log(session,'session');
    users.push({
      userID: session.userID,
      username: session.username,
      connected: session.connected,
    });
    
  });
  console.log(users,'users');
  socket.emit("users", users);

  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });

  // forward the private message to the right recipient (and to other tabs of the sender)
  socket.on("private_message", ({ content, to }) => {
    socket.to(to).to(socket.userID).emit("private message", {
      content,
      from: socket.userID,
      to,
    });
  });

  // notify users upon disconnection
  socket.on("disconnect", async () => {
    const matchingSockets = await io.in(socket.userID).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit("user disconnected", socket.userID);
      // update the connection status of the session
      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: false,
      });
    }
  });

  // users++;

  // socket.emit("new_user_connect", "Hello, Welcome");
  // // io.sockets.emit("global_event","message to all")  //it is used to global broadcast
  // socket.broadcast.emit("new_user_connect", users + " users connected!");

  // socket.join("Room -" + roomNo);
  // io.sockets
  //   .in("Room -" + roomNo)
  //   .emit("connectionRoom", "you are connected to room no " + roomNo);

  // // Event fire when user join chat room
  // socket.on("join_room", (data) => {
  //   console.log(data,'----User join');
  //   socket.join(data);
  //   socket.emit("user_join", `User with ID: ${socket.id} joined room: ${data}`);
  // });

  // // console.log(socket.decoded);
  // // custom event received form user side
  // socket.on("send_message", async (data) => {
  //   // let userData = { ...data, room: socket.decoded.id, author: socket.decoded.name };
  //   console.log(data,'send messages');
  //   // StoreChat(data);
  //   socket.to(data.room).emit("receive_message", data);
  // });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    socket.emit("disconnected"), socket.id;
    // users--;
    socket.broadcast.emit("new_user_connect", users + " users connected!");
    socket.removeAllListeners();
  });
};

export default UserChatSocket;
