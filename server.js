import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";



//config the appp 
const app = express();
const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.ORIGIN;
dotenv.config();
cors();


// create server 
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: ORIGIN },
});

//test app 
app.get("/", (req, res) => {
  res.json("Hello world ");
});


//concect app
io.on("connection", (socket) => {
  const transport = socket.conn.transport.name; // in most cases, "polling"

  socket.conn.on("upgrade", () => {
    const upgradedTransport = socket.conn.transport.name; // in most cases, "websocket"
  });
  console.log("client connected: ", socket.id);
  socket.on("send-message", (message) => {
    console.log("message:", message);
    socket.broadcast.emit("messagesssssssssssssssssssssss", message);
    socket.emit("messagesssssssssssssssssssssss", message);
  });
});

// setInterval(() => {
//   io.to("clock-room").emit("time", new Date());
// }, 1000);

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
