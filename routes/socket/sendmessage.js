import Converstion from "../../db/schema/Converstions.js";

const sendmessage = (socket, AllUsers, io) => {
  socket.on("send-messageto-user", async (data) => {

    const receiver = data.receiver.toString("");
    const sender = data.sender.toString("");
    console.log(data);
    const sendersid = AllUsers.filter((user) => (user.userid = sender));
    const revieverid = AllUsers.filter((user) => (user.userid = receiver));
    const Recvicer = () => {
      return AllUsers.find((user) => (user.userid = receiver));
    };
    // const userobj = Recvicer;
    sendersid.map((itme, index) => {
      if (index === revieverid.length - 1) {
        io.to(itme.socketid).emit("get-message", data);
        console.log("sent message to", itme.userid);
        console.log("yes");
      } else {
        console.log("no");
      }
    });

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
