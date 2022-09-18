import express from "express";
import contactRoutesGets from "./get/contactRoutesGets.js";
import contactRoutesPosts from "./post/contactRoutesPosts.js";

const contactRoutes = express.Router();
contactRoutes.use("/", contactRoutesPosts);
contactRoutes.use("/", contactRoutesGets);

export default contactRoutes;
