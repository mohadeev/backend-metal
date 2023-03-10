import express from "express";
import User from "../../../db/schema/user.js";
const renderImages = express.Router();
import { GridFsStorage } from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import mongoose from "mongoose";
import multer from "multer";

const mongoURL =
  "mongodb+srv://urex:guYGHY4GWEN53MbT@cluster0.iv6bcrf.mongodb.net/?retryWrites=true&w=majority";
const conn = mongoose.createConnection(mongoURL);
let gfs, gridfsBucket;

conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "images",
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("images");
});

renderImages.get("/get/read/images/:filename", async (req, res) => {
  const filename = req.params.filename;
  if (filename && filename.length > 10) {
    gfs.files.findOne({ filename: filename }, (err, file) => {
      if (file) {
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
      } else {
        res.status(404).json({
          err: "Not an image",
        });
      }
    });
  }
});

export default renderImages;
