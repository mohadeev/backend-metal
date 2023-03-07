import express from "express";
const uploadProductImages = express.Router();
import fs from "fs";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import cloudinary from "../../../utils/cloudinary/cloudinary.js";

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
    const prId = req.body.prId;

    const { path, originalname } = req.file;
    try {
      const result = await cloudinary.v2.uploader.upload(path);
      console.log("result", result);
      const public_id = result.public_id;
      const url = result.url;
      const imageData = { public_id, url };
      res.json({ File });
    } catch (err) {
      console.log(err);
    }
  }
);

export default uploadProductImages;
