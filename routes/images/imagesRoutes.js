import express from "express";
import imagesGetRouts from "./get/imagesGetRouts.js";
import imagesPostsRouts from "./post/imagesPostsRouts.js";

const imagesRoutes = express.Router();
imagesRoutes.use("/", imagesGetRouts);
imagesRoutes.use("/", imagesPostsRouts);

export default imagesRoutes;
