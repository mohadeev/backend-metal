const sendmessage = (socket, AllUsers, io) => {
  socket.on("send-messageto-user", (data) => {
    io.to(data.conversationId).emit("get-message", data);
    socket.to(data.conversationId).emit("get-message", data);
    socket.broadcast.to(data.conversationId).emit("get-message", data);
    
    // console.log(data.conversationId);
  });
};
export default sendmessage;
