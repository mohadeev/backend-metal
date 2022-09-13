import express from "express";
import tourModal from "../../../db/schema/tour.js";
const allTours = express.Router();

allTours.get("/get/all-tours", async (req, res) => {
  tourModal.find({}).then((allToursData) => {
    const tours = allToursData.filter((item) => item.days.length >= 2);
    console.log(tours);
    if (tours) {
      res.json({ responseData: tours });
    } else {
      res.json({ responseData: [] });
    }
  });
});

export default allTours;
