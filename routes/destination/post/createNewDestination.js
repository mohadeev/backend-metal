import express from "express";
import destinationModal from "../../../db/schema/destination.js";

const createNewDestination = express.Router();

createNewDestination.post("/", async (req, res) => {
  const userId = req.userId;
  console.log(req.body);
  const data = req.body;
  
  destinationModal.create(data).then((destination) => {
    console.log(destination);
    res.json({ sdf: "SD" });
  });
});

export default createNewDestination;
