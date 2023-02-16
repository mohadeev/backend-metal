import express from "express";
import tourModal from "../../../db/schema/product.js";
const tourData = express.Router();

tourData.get("/get/tour-data/:tourId", async (req, res) => {
  const tourId = req.params.tourId;
  if (tourId) {
    tourModal.findOne({ _id: tourId }).then((eachTour) => {
      console.log(eachTour);
      res.json({ responseData: eachTour });
    });
  }
});

export default tourData;
