import express from "express";
import tourModal from "../../../db/schema/product.js";
const allTours = express.Router();

allTours.get("/get/all-tours", async (req, res) => {
  tourModal.find({}).then((allToursData) => {
    console.log("allToursData", allToursData);
    if (allToursData) {
      res.json({ responseData: allToursData });
    } else {
      res.json({ responseData: [] });
    }
  });
});

export default allTours;
