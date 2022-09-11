import express from "express";
import tourModal from "../../../db/schema/tour.js";
const allTours = express.Router();

allTours.get("/get/all-tours", async (req, res) => {
  tourModal.find({}).then((allToursData) => {
    res.json({ responseData: allToursData });
  });
});

export default allTours;
