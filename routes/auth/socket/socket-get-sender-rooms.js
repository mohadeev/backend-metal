import Message from "../../../db/schema/Message.js";
import dbConnect from "../../../db/dbConnect.js";
import User from "../../../db/schema/user.js";


export const SocketGetSenderRooms = async (socket) => {
  let cookiesUser = socket.handshake.query.user;
  dbConnect();
  await User.findOne({ _d: cookiesUser }).then((document) => {
    if (document) {
      const sendrs = document.senders;
      sendrs.map((items) => {
        Message.findOne({ _d: items }).then((senders) => {
          console.log(senders);;
        });
      });
      socket.emit("send-senders-and-messages");
      // console.log(document);
    } else {
      console.log("nono");
    }
  });
};
