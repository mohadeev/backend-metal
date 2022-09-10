import express from "express";
const uplaodImage = express.Router();
import { GridFsStorage } from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import AuthToken from "../../../utils/verify-user/VerifyUser.js";
import mongoose from "mongoose";
import multer from "multer";
import crypto from "crypto";
import path from "path";

const mongoURL =
  "mongodb+srv://urex:guYGHY4GWEN53MbT@cluster0.iv6bcrf.mongodb.net/?retryWrites=true&w=majority";

const conn = mongoose.createConnection(mongoURL);
let gfs, gridfsBucket, gridfsBucketThumbnail;
conn.once("open", () => {
  console.log("db is connected");
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "images",
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("images");
});

const storage = new GridFsStorage({
  url: mongoURL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        } else {
          const filename =
            buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "images",
          };
          resolve(fileInfo);
        }
      });
    });
  },
});

const upload = multer({ storage });
uplaodImage.post(
  "/post/imges/upload-image",
  upload.single("image"),
  async (req, res) => {
    const File = req.file;
    const contentType = File.contentType;
    if (
      contentType === "image/png" ||
      contentType === "image/gif" ||
      contentType === "image/jpg" ||
      contentType === "image/jpeg" ||
      contentType === "image/jfif" ||
      contentType === "image/svg"
    ) {
      res.json({ file: File.filename, uploaded: true });
    }
    req.file = null;
  }
);

export default uplaodImage;
