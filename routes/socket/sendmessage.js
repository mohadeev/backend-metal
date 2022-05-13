import Converstion from "../../db/schema/Converstions.js";

const sendmessage = (socket, AllUsers, io) => {
  socket.on("send-messageto-user", async (data) => {
    // const daddd = await Converstion.findOne({
    //   _id: data.conversationId,
    // });
    // io.to(data.conversationId).emit("get-message", data);
    const receiver = data.receiver.toString("");
    const sender = data.sender.toString("");
    // const sendersid = AllUsers.filter((user) => (user.userid = sender));
    const revieverid = AllUsers.filter((user) => (user.userid = receiver));
    const Recvicer = () => {
      return AllUsers.find((user) => (user.userid = receiver));
    };
    // const userobj = Recvicer;
    revieverid.map((itme, index) => {
      if (index === revieverid.length - 1) {
        io.to(itme.socketid).emit("get-message", data);
        console.log("sent message to", itme.userid);
        console.log("yes");
      } else {
        console.log("no");
      }
    });

    // console.log(Recvicer());
  });
};

export default sendmessage;
