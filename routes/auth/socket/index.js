import { Server, Socket } from "socket.io";
import Message from "../../../db/schema/Message.js";
import dbConnect from "../../../db/dbConnect.js";
import cookie from "cookie";
import { SocketGetSenderRooms } from "./socket-get-sender-rooms.js";

const SocketSend = async (socket) => {
  let cookiesUser = socket.handshake.query.user;
  // console.log("client connected: ", cookies, socket.id);
  SocketGetSenderRooms(socket);
  socket.on("send-message", async (messagedata) => {
    console.log(messagedata);
    dbConnect();
    await Message.create({
      message: messagedata,
      sender: cookiesUser,
    }).then(async (doc) => {
      const data = await Message.find({});
      socket.emit("send-all-messages", data);
      socket.broadcast.emit("messagesssssssssssssssssssssss", doc);
      socket.emit("messagesssssssssssssssssssssss", doc);
    });
  });
  dbConnect();
  await Message.find({}).then((data) => {
    socket.emit("send-all-messages", data);
  });
};

export default SocketSend;
