import express from "express";
import mongoose from "mongoose";
import Message from "../../db/schema/Message.js";
import Converstion from "../../db/schema/Converstions.js";

const sendmessages = async (req, res) => {
  console.log("sd");
  const asPath = req.path;
  let UrlBeRemove = "/get-mesages/";
  let convId = asPath.replace(UrlBeRemove, "").toString("hex");
  const UserId = req.headers.a_custom_header;
  if (!mongoose.Types.ObjectId.isValid(convId)) {
    console.log("non");
  } else if (
    mongoose.Types.ObjectId.isValid(convId) &&
    convId.length >= 12 &&
    convId.length <= 24 &&
    typeof UserId !== "undefined"
  ) {
    await Converstion.findOne({ _id: convId }).then(async (Coversion) => {
      if (Coversion) {
        if (Coversion.members.includes(UserId)) {
          try {
            const data = await Message.find({ conversationId: convId })
              .sort({ _id: -1 })
              .limit(10);

            res.json({ data: data.reverse() });
          } catch (erro) {
            res.status(500).json(erro.message);
          }
        }
      }
    });
  } else {
    console.log("i dont know");
  }
};
export default sendmessages;
