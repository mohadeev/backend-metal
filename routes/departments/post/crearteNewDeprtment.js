import express from "express";
import mongoose from "mongoose";
import departmentsModal from "../../../db/schema/departments.js";
import productModal from "../../../db/schema/productModal.js";
import resFuncError from "../../../utils/resFuncError.js";

const crearteNewDeprtment = express.Router();

crearteNewDeprtment.post("/", async (req, res) => {
  const id = "63fc0305876826ff032d68cb";
  const depsData = req.body.deprtments;
  console.log("depsData", depsData);
  const myObjectId = mongoose.Types.ObjectId(id);
  try {
    await departmentsModal.updateOne(
      { _id: myObjectId },
      { departments: depsData }
    );
    departmentsModal.find({}).then((channels) => {
      const newObjectId = new mongoose.Types.ObjectId();
      // console.log("channels", channels);
      if (channels.length) {
        // console.log(channels[0]?.departments);
        res.json({ responseData: channels[0].departments });
      } else {
        res.json({ responsMessage: "NoChanelFounded" });
      }
    });
  } catch (error) {}
});

export default crearteNewDeprtment;
