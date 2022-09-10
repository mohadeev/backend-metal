import express from "express";
import tourPosts from "./post/tourPosts.js";

const tourRouter = express.Router();
tourRouter.use("/", tourPosts);

export default tourRouter;
