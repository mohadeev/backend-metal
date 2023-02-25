import express from "express";
import productModal from "../../../db/schema/productModal.js";
import User from "../../../db/schema/user.js";

const initProduct = express.Router();

initProduct.post("/", async (req, res) => {
  console.log("creating channel");
  const userId = req.userId;
  await User.findOne({ _id: userId }).then(async (docadded) => {
    if (docadded) {
      productModal
        .create({
          creator: userId,
        })
        .then((product) => {
          console.log(product);
          res.json({ responsData: product });
        });
    } else {
      res.end();
    }
  });
});

export default initProduct;
