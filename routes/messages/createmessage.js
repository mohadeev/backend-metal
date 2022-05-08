import express from "express";
import mongoose from "mongoose";
import Message from "../../db/schema/Message.js";
import dbConnect from "../../db/dbConnect.js";
const router = express.Router();
router.post("/", async (req, res) => {
  console.log(req.body);
  const { message, sender } = req.body;
  //   console.log(message, sender);
  try {
    await Message.create({
      message: message,
      sender: sender,
    });
    const Messages = await Message.find({});
    // console.log(Messages);
    res.status(200).json({ data: Messages });
  } catch (err) {
    res.json(err);
  }
});

export default router;
