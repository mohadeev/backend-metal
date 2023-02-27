import express from "express";
const Routes = express.Router();
import routesAuth from "./auth/auth.js";
import contactRoutes from "./contact/contactRoutes.js";
import departmentsRoutes from "./departments/departmentsRoutes.js";
import destinationRouter from "./destination/destinationRouter.js";
import imagesRoutes from "./images/imagesRoutes.js";
import productGets from "./product/get/productGets.js";
import productRouter from "./product/productRouter.js";
import tourRouter from "./tour/tourRouter.js";

Routes.use("/api", routesAuth);

Routes.use("/api", tourRouter);
Routes.use("/api", destinationRouter);
Routes.use("/api", imagesRoutes);
Routes.use("/api", contactRoutes);
Routes.use("/api", productRouter);
Routes.use("/api", departmentsRoutes);

// Routes.post("/api/add-tag", async (req, res) => {
//   const tagValue = req.body.tag;
//   console.log("hererer tags ");
//   await tag.create({ tag: tagValue }).then((tagDoc) => {
//     console.log(tagDoc);
//     res.json({ data: tagDoc });
//   });
// });

export default Routes;
