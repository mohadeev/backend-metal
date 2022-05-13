import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import dbConnect from "./db/dbConnect.js";
import Message from "./db/schema/Message.js";
import User from "./db/schema/user.js";
import Singin from "./routes/auth/singin/singin.js";
import SingUp from "./routes/auth/singup/singup.js";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import SocketMessage from "./routes/socket/index.js";
import createmessages from "./routes/messages/createmessage.js";
import conversations from "./routes/conversations/conversations.js";
import senduser from "./routes/senduser.js";

//config the appp
const app = express();
const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.ORIGIN;

dotenv.config();
cors(
  { "Access-Control-Allow-Origin": `*` },
  "Access-Control-Allow-Methods: POST, PUT, PATCH, GET, DELETE, OPTIONS",
  "Access-Control-Allow-Headers: Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization"
);

//db conncet
dbConnect();
// create server

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: ORIGIN },
});
// concect app

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", `*`);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS,  PUT,PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,a_custom_header"
  ); //notice here carefully
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api/user/singin", Singin);
app.use("/api/user/singup", SingUp);
app.use("/api/livechat/sendmessage", createmessages);
app.use("/api/user/conversations", conversations);
app.use("/api/user/senduser", senduser);

app.get("/", async (req, res) => {
  dbConnect();
  const users = await User.find({});
  let username = users.map((itmes) => itmes.username).toString();
  let id = users.map((itmes) => itmes._id).toString("hex");
  let image = users.map((itmes) => itmes.image).toString();
  res.json([{ username: username, id: id, image: image }]);
});
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    // console.log(senderId, receiverId, text);
    const user = getUser(receiverId);
    const sender = getUser(senderId);
    io.to(sender.socketId).emit("getMessage", {
      senderId,
      text,
    });
    if (typeof user !== undefined) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});

// io.use(async (socket, next) => {
//   let cookies = socket.handshake.query.token;
//   let cookiesUser = socket.handshake.query.user;

//   const dataObj = { name: cookies };
//   if (cookies && cookiesUser) {
//     const cookief = cookies;
//     // var cookiesss = JSON.parse(cookiesss || "");
//     // cookie.parse(socket.handshake.query || "");
//     // console.log(cookiesss);
//     // console.log(socket.handshake.query);
//     jwt.verify(
//       dataObj.name,
//       process.env.ACCCES_TOKKEN_SECRET,
//       function (err, decoded) {
//         if (err) {
//           console.log("error verfy");
//           return next(new Error("Authentication error"));
//         } else {
//           socket.decoded = decoded;
//           socket.user = decoded.user;
//           next();
//         }
//       }
//     );
//   } else {
//     console.log("error11");
//     next(new Error("Authentication error"));
//   }
// })
// let AllUsers = [];
// var IdFromClient = "";

// const AddUser = (UserId, SocketId) => {
//   if (UserId !== "") {
//     const result = AllUsers.find((obj) => {
//       return obj.userid === UserId;
//     });
//     AllUsers.push({ userid: UserId, socketid: SocketId });
//   }
// };

// const RemoveUser = (IdDescnected) => {
//   // let objIndex = AllUsers.findIndex((obj) => obj.socketid === IdDescnected);
//   // AllUsers.map(() => {
//   //   console.log(objIndex);
//   // });
//   // console.log()
//   // AllUsers.splice(objIndex, 1);
//   // console.log("user removed", IdDescnected);
//   // console.log("user removed", AllUsers);
//   AllUsers.filter((items) => items.socketid !== IdDescnected);
//   console.log(AllUsers);
// };

// io.on("connection", (socket) => {
//   // console.log("connected ", socket.id);
//   socket.on("get-id", (bdid) => {
//     if (bdid !== null) {
//       IdFromClient = bdid;
//     }
//   });
//   AddUser(IdFromClient, socket.id);

// socket.on("create", (room) => {
//   socket.join(room.room);
//   // console.log(room.room, room.userid, socket.id);
// });

// socket.on("send-messageto-user", (data) => {
//   io.to(data.conversationId).emit("get-message", data);
//   socket.to(data.conversationId).emit("get-message", data);
//   socket.broadcast.to(data.conversationId).emit("get-message", data);
//   // console.log(data.conversationId);
// });
//   SocketMessage(socket, AllUsers, io);
//   socket.on("disconnect", () => {
//     // console.log("desconected", socket.id);
//     RemoveUser(socket.id);
//   });
// });

// server.listen(PORT, (err) => {
//   if (err) console.log(err);
//   console.log("Server running on Port ", PORT);
// });
