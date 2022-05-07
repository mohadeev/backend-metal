import Message from "../../../db/schema/Message.js";
import dbConnect from "../../../db/dbConnect.js";
import User from "../../../db/schema/user.js";

export const SocketGetSenderRooms = async (socket) => {
  let cookiesUser = socket.handshake.query.user;
  dbConnect();
  await User.findOne({ _d: cookiesUser }).then((document) => {
    if (document) {
      // console.log(document);
    } else {
      console.log("nono");
    }
  });
};
