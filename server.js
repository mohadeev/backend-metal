const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");


const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "https://socketio-psi.vercel.app" },
});
app.get("/", (req, res) => {
  res.json("Hello world ");
});
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
