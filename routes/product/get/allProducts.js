import express from "express";
import productModal from "../../../db/schema/productModal.js";
import User from "../../../db/schema/user.js";
const allProducts = express.Router();

allProducts.get("/", async (req, res) => {
  const userId = req.userId;
  console.log("all products sent");
  await User.findOne({ _id: userId }).then((docadded) => {
    if (docadded) {
      productModal.find({ creator: userId }).then((channels) => {
        if (channels.length) {
          res.json({ responseData: channels });
        } else {
          res.json({ responsMessage: "NoChanelFounded" });
        }
      });
    } else if (!docadded) {
      res.json({
        message: "EamilNotFinded",
      });
    }
  });
});

export default allProducts;
