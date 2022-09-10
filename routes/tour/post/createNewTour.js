import express from "express";
import tourModal from "../../../db/schema/tour.js";

const createNewTour = express.Router();

createNewTour.post("/", async (req, res) => {
  const userId = req.userId;
  console.log(req.body);
  const data = req.body;
  tourModal.create(data).then((tour) => {
    console.log(tour);
    res.json({ sdf: "SD" });
  });
});

export default createNewTour;
