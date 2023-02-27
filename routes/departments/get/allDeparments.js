import express from "express";
import productModal from "../../../db/schema/productModal.js";
import departments from "../../../db/schema/departments.js";
import mongoose from "mongoose";
const allDeparments = express.Router();

allDeparments.get("/", async (req, res) => {
  console.log("all departs  sent");
  departments.find({}).then((channels) => {
    const newObjectId = new mongoose.Types.ObjectId();

    console.log("channels", channels);
    if (channels.length < 1) {
      departments
        .create({
          departments: [{ name: "All Departments", _id: newObjectId, sub: [] }],
        })
        .then((deps) => {
          console.log("deps", deps);
        });
    }

    if (channels.length) {
      console.log(channels[0]?.departments);
      res.json({ responseData: channels[0].departments });
    } else {
      res.json({ responsMessage: "NoChanelFounded" });
    }
  });
});

export default allDeparments;
