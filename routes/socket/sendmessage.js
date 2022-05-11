const sendmessage = (socket, AllUsers, io) => {
  socket.on("send-messageto-user", (data) => {
    io.to(data.conversationId).emit("get-message", data);
    socket.to(data.conversationId).emit("get-message1", data);
    socket.emit("get-message2", data);
    console.log("heyyyyy:", AllUsers);

    socket.broadcast.to(data.conversationId).emit("get-message3", data);
    socket.broadcast.emit("get-message4", data);
    io.in(data.conversationId).emit("get-message5", data);
    // console.log(data.conversationId);
  });
};
export default sendmessage;
