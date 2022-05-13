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

var AllUsers = [];
var IdFromClient;
const AddUser = (UserId, SocketId) => {
  AllUsers = [...AllUsers, { userid: UserId, socketid: SocketId }];
  // console.log("data added:", AllUsers);
};

const RemoveUser = (IdDescnected) => {
  AllUsers.filter((items) => items.socketid === IdDescnected);
  // console.log("whene remove", AllUsers);
};
io.use(async (socket, next) => {
  let cookies = socket.handshake.query.token;
  let cookiesUser = socket.handshake.query.user;

  const dataObj = { name: cookies };
  if (cookies && cookiesUser) {
    const cookief = cookies;
    jwt.verify(
      dataObj.name,
      process.env.ACCCES_TOKKEN_SECRET,
      function (err, decoded) {
        if (err) {
          console.log("error verfy");
          return next(new Error("Authentication error"));
        } else {
          // console.log("true");
          socket.decoded = decoded;
          socket.user = decoded.user;
          next();
        }
      }
    );
  } else {
    console.log("error11");
    next(new Error("Authentication error"));
  }
}).on("connection", (socket) => {
  // console.log("connected ", socket.id);
  socket.on("get-id", (bdid) => {
    // console.log(bdid);
    if (bdid !== null) {
      IdFromClient = bdid;
      AddUser(bdid, socket.id);
    }
  });
  // console.log(AllUsers.length);

  SocketMessage(socket, AllUsers, io);
  socket.on("disconnect", () => {
    // console.log("desconected", socket.id);
    // RemoveUser(socket.id);
  });
});

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
