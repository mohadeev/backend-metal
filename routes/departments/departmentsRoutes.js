import express from "express";
import departmentsRoutesPosts from "./post/departmentsRoutesPosts.js";
import departmentsRoutesGets from "./get/departmentsRoutesGets.js";

const departmentsRoutes = express.Router();
departmentsRoutes.use("/", departmentsRoutesGets);
departmentsRoutes.use("/", departmentsRoutesPosts);

// departmentsRoutes.use("/", departmentsRoutesDeletes);

export default departmentsRoutes;
