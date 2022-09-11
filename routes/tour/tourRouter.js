import express from "express";
import tourRoutesGets from "./get/tourRoutesGets.js";
import tourPosts from "./post/tourPosts.js";

const tourRouter = express.Router();
tourRouter.use("/", tourPosts);
tourRouter.use("/", tourRoutesGets);

export default tourRouter;
