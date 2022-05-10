import express from "express";
import mongoose from "mongoose";
import Message from "../../db/schema/Message.js";
import sendmessages from "./sendmessages.js";
const router = express.Router();
import Converstion from "../../db/schema/Converstions.js";

router.post("/", async (req, res) => {
  const { message, sender, conversationId, receiver } = req.body;
  await Converstion.findOne({ _id: conversationId }).then(async (Coversion) => {
    if (Coversion) {
      if (Coversion.members.includes(sender)) {
        try {
          await Message.create({
            message: message,
            sender: sender,
            conversationId: conversationId,
          });
          const data = await Message.find({ conversationId: conversationId });
          res.json({ data: data });
        } catch (erro) {
          res.status(500).json(erro.message);
        }
      }
    } else {
      console.log("df");
      try {
        const Messages = await Message.find({ conversationId: conversationId });
        res.status(200).json({ data: Messages });
      } catch (err) {
        res.json(err);
      }
    }
  });
});

router.get("/get-mesages/:id", sendmessages);

export default router;
