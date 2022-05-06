import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import dbConnect from "./db/dbConnect.js";
import Message from "./db/schema/Message.js";
import Singin from "./routes/auth/singin/singin.js";
import SingUp from "./routes/auth/singup/singup.js";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import SocketMessage from "./routes/auth/socket/index.js";
//config the appp
const app = express();
const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.ORIGIN;
dotenv.config();
cors(
  { "Access-Control-Allow-Origin": `${ORIGIN}` },
  "Access-Control-Allow-Methods: POST, PUT, PATCH, GET, DELETE, OPTIONS",
  "Access-Control-Allow-Headers: Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization"
);

// create server
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: ORIGIN },
});
//concect app

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", `${ORIGIN}`);
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

app.get("/", (req, res) => {
  // const accesToken = req.headers.a_custom_header;
  // console.log(accesToken);
  console.log(req.user);
  res.json({ message: "hey" });
});

io.use((socket, next) => {
  let cookies = socket.handshake.query.token;
  console.log(cookies, "sdffdfdf hahahah");
  if (cookies) {
    // console.log(socket.handshake.headers.cookie);
    var cookief = socket.handshake.headers.cookie;
    // var cookies = cookie.parse(socket.handshake.headers.cookie || "");
    jwt.verify(
      cookies,
      process.env.ACCCES_TOKKEN_SECRET,
      function (err, decoded) {
        if (err) {
          console.log("error verfy");
          return next(new Error("Authentication error"));
        } else {
          // console.log(decoded);
          socket.decoded = decoded;
          next();
        }
      }
    );
  } else {
    console.log("error11");
    next(new Error("Authentication error"));
  }
}).on("connection", async (socket) => {
  const transport = socket.conn.transport.name;
  socket.conn.on("upgrade", () => {
    const upgradedTransport = socket.conn.transport.name;
  });
  var cookief = socket.handshake.headers.cookie;
  var cookies = cookie.parse(socket.handshake.headers.cookie || "");
  SocketMessage(socket);
});

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
