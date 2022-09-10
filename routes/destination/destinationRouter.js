import express from "express";
import destinationRoutesGets from "./get/destinationRoutesGets.js";
import destinationPosts from "./post/destinationPosts.js";

const destinationRouter = express.Router();
destinationRouter.use("/", destinationPosts);
destinationRouter.use("/", destinationRoutesGets);

export default destinationRouter;
