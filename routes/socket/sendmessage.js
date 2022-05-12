import Converstion from "../../db/schema/Converstions.js";

const sendmessage = (socket, AllUsers, io) => {
  socket.on("send-messageto-user", async (data) => {
    // const daddd = await Converstion.findOne({
    //   _id: data.conversationId,
    // });
    io.to(data.conversationId).emit("get-message", data);
    console.log(AllUsers);
    console.log(data.receiver);
    console.log(data.receiver);

    const revieverid = AllUsers.filter((users) => {
      users.userid === data.receiver;
    });
    const sendersid = AllUsers.filter((users) => {
      users.userid === data.sender;
    });

    console.log("reviever:", revieverid);
    console.log("sender:", sendersid);

    // socket.to(data.conversationId).emit("get-message1", data);
    // socket.emit("get-message2", data);
    // socket.broadcast.to(data.conversationId).emit("get-message3", data);
    // // socket.broadcast.emit("get-message4", data);
    // io.in(data.conversationId).emit("get-message5", data);
    // console.log("heyyyyy:", AllUsers);
    // console.log(data.conversationId);
  });
};
export default sendmessage;
