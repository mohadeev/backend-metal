import express from "express";
import productModal from "../../../db/schema/product";
import User from "../../../db/schema/user";

const initChannel = express.Router();

initChannel.post("/", async (req, res) => {
  console.log("creating channel");
  const userId = req.userId;
  await User.findOne({ _id: userId }).then(async (docadded) => {
    if (docadded) {
      productModal
        .create({
          creator: userId,
        })
        .then((channel) => {
          res.json({ responsData: channel });
        });
    } else {
      res.end();
    }
  });
});

export default initChannel;
