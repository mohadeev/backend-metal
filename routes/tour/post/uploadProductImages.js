import express from "express";
const uploadProductImages = express.Router();
import fs from "fs";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import productModal from "../../../db/schema/productModal.js";
import cloudinary from "../../../utils/cloudinary/cloudinaryMain.js";

const __dirname = path.resolve();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "./uploads"));
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
uploadProductImages.post(
  "/post/product/upload-product-images/",

  upload.single("image"),
  async (req, res) => {
    const File = req.file;
    const productId = req.body.productId;
    const itemId = req.body.itemId;
    const itemClass = req.body.itemClass;
    const itemObjt = req.body.itemObjt;
    const { path, originalname } = req.file;

    if (mongoose.Types.ObjectId.isValid(productId)) {
      await productModal.findOne({ _id: productId }).then(async (prdt) => {
        const update = prdt;
        const filter = { _id: productId };
        const objToUpdate = update.productData.configurator[itemClass];

        if (objToUpdate) {
          console.log("finded");
        } else {
          update.productData.configurator[itemClass] = {};
          update.productData.configurator[itemClass].data = [];
        }
        const arryToUpdate = update.productData.configurator[itemClass].data;

        const handelFun = async () => {
          try {
            const result = await cloudinary.v2.uploader.upload(path);
            const public_id = result.public_id;
            const url = result.url;
            const imageData = { public_id, url };
            const objToUpate = arryToUpdate.findIndex(
              ({ _id }) => _id === itemId
            );
            if (objToUpate >= 0) {
              update.productData.configurator[itemClass].data[objToUpate].img =
                imageData;
            } else {
              update.productData.configurator[itemClass].data.push({
                _id: itemId,
                img: imageData,
                value: "",
                price: "",
              });
            }
            console.log("finded main", imageData);
            await productModal.updateOne(filter, update);
            res.json({ responseData: imageData });
          } catch (err) {
            console.log(err);
          }
        };
        await handelFun();
      });
    } else {
      console.log("no prft finded");
    }
  }
);

export default uploadProductImages;
