import express from "express";
import multer from "multer";

const uploadProductImages = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define the route to handle image uploads
uploadProductImages.post(
  "/upload",
  upload.single("image"),
  function (req, res) {
    console.log(req.file);
    res.send("Image uploaded successfully");
  }
);

export default uploadProductImages;
