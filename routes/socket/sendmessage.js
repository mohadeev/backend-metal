import Converstion from "../../db/schema/Converstions.js";

const sendmessage = (socket, AllUsers, io) => {
  socket.on("send-messageto-user", async (data) => {
    // const daddd = await Converstion.findOne({
    //   _id: data.conversationId,
    // });

    io.to(data.conversationId).emit("get-message", data);
    // console.log(AllUsers);
    const receiver = data.receiver.toString("");
    const sender = data.sender.toString("");
    const sendersid = AllUsers.filter((user) => (user.userid = sender));
    const revieverid = AllUsers.filter((user) => (user.userid = receiver));

    console.log("reviever:", revieverid);
    console.log("sender:", sendersid);

    // revieverid.map((Reviever) => {
    //   console.log(" message sent to : reciver as well", Reviever.socketid);
    //   io.to(Reviever.socketid).emit("get-message", data);
    // });
    // sendersid.map((Senders) => {
    //   console.log(" message sent to : sender as well", Senders.socketid);
    //   io.to(Senders.socketid).emit("get-message", data);
    // });

    // revieverid.map((Reviever) => {
    //   console.log(" message sent to : reciver as well", Reviever.socketid);
    //   io.to(Reviever.socketid).emit("get-message", data);
    // });

    const Reviever = revieverid[revieverid.length - 1].socketid;
    const Sender = sendersid[sendersid.length - 1].socketid;

    // console.log("reviever:", Reviever);
    // console.log("sender:", Sender);
    io.to(Reviever).emit("get-message", data);
    io.to(Sender).emit("get-message1", data);
    socket.to(Reviever).emit("get-message", data);
    socket.to(Sender).emit("get-message1", data);
    // const datass = [Reviever, Sender];
    // socket.broadcast.emit("get-message", data);
    // socket.broadcas.emit("get-message1", data);
    socket.broadcast.to(Reviever).emit("get-message", data);
    socket.broadcast.to(Sender).emit("get-message", data);
        socket.broadcast.emit("get-message", data);


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
