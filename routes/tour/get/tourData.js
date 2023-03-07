import express from "express";
import mongoose from "mongoose";
import tourModal from "../../../db/schema/productModal.js";
const tourData = express.Router();
//fgfg
tourData.get("/get/tour-data/:tourId", async (req, res) => {
  const tourId = req.params.tourId;
  if (mongoose.Types.ObjectId.isValid(tourId)) {
    if (tourId) {
      tourModal.findOne({ _id: tourId }).then((eachTour) => {
        console.log(eachTour);
        res.json({ responseData: eachTour });
      });
    }
  }
});

export default tourData;
