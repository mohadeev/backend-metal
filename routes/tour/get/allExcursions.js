import express from "express";
import tourModal from "../../../db/schema/tour.js";
const allExcursions = express.Router();

allExcursions.get("/get/all-excursions", async (req, res) => {
  tourModal.find({}).then((allExcursionsData) => {
    const excursions = allExcursionsData.filter(
      (item) => item.days.length == 1
    );
    console.log(excursions);
    if (excursions) {
      res.json({ responseData: excursions });
    } else {
      res.json({ responseData: [] });
    }
  });
});

export default allExcursions;
