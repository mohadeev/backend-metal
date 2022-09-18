import express from "express";
import destinationModal from "../../../db/schema/destination.js";
const allDestinations = express.Router();

allDestinations.get("/get/contact-for", async (req, res) => {
  destinationModal.find({}).then((allDestinations) => {
    res.json({ responseData: allDestinations });
  });
});

export default allDestinations;
