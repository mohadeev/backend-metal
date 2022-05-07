import { Server, Socket } from "socket.io";
import Message from "../../../db/schema/Message.js";
import dbConnect from "../../../db/dbConnect.js";
import cookie from "cookie";

const SocketSend = async (socket) => {
  var cookief = socket.handshake.headers.cookie;
  var cookies = cookie.parse(socket.handshake.headers.cookie || "");
  let cookiesUser = socket.handshake.query.user;
  // console.log("client connected: ", cookies, socket.id);
  socket.on("send-message", async (message) => {
    dbConnect();
    console.log(message);
    await Message.create({
      message: message,
      sender: cookiesUser,
    }).then(async (doc) => {
      socket.broadcast.emit("messagesssssssssssssssssssssss", doc);
      socket.emit("messagesssssssssssssssssssssss", doc);
    });
  });
  dbConnect();
  const data = await Message.find({});
  socket.emit("send-all-messages", data);
};

export default SocketSend;
