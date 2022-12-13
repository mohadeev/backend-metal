import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import dbConnect from "./db/dbConnect.js";
import Message from "./db/schema/Message.js";
import User from "./db/schema/user.js";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import SocketMessage from "./routes/socket/index.js";
import createmessages from "./routes/messages/createmessage.js";
import conversations from "./routes/conversations/conversations.js";
import senduser from "./routes/senduser.js";
import Routes from "./routes/routes.js";
import mongoose from "mongoose";
import axios from "axios";
import countryModal from "./db/schema/country.js";

//config the appp
const app = express();
const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.ORIGIN;
console.log(ORIGIN);
dotenv.config();
cors(
  { "Access-Control-Allow-Origin": ORIGIN },
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
    "X-Requested-With,content-type, scrolling, a_custom_header"
  );
  // res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/", Routes);
app.get("/countries", (req, res) => {
  const allmyData = [];
  countryModal.find({}).then(async (contry) => {
    await Promise.all(
      contry.map(async (vid, index) => {
        if (
          vid.json.name.common === "United States" ||
          vid.json.name.common === "Spain" ||
          vid.json.name.common === "Germany" ||
          vid.json.name.common === "France"
        ) {
          await allmyData.push(vid);
        }
      })
    );
    res.json({ responseData: allmyData });
  });
});

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
