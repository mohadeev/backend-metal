import Converstion from "../../db/schema/Converstions.js";

const sendmessage = (socket, AllUsers, io) => {
  socket.on("send-messageto-user", async (data) => {
    const daddd = await Converstion.findOne({
      _id: data.conversationId,
    });
    console.log(daddd);
    
    io.to(data.conversationId).emit("get-message", data);
    socket.to(data.conversationId).emit("get-message1", data);
    // console.log("heyyyyy:", AllUsers);

    // socket.emit("get-message2", data);
    // socket.broadcast.to(data.conversationId).emit("get-message3", data);
    // socket.broadcast.emit("get-message4", data);
    // io.in(data.conversationId).emit("get-message5", data);
    // console.log(data.conversationId);
  });
};
export default sendmessage;
