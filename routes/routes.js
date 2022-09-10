import express from "express";
const Routes = express.Router();
import routesAuth from "./auth/auth.js";
import destinationRouter from "./destination/destinationRouter.js";
import imagesRoutes from "./images/imagesRoutes.js";
import tourRouter from "./tour/tourRouter.js";

Routes.use("/api", routesAuth);

Routes.use("/api", tourRouter);
Routes.use("/api", destinationRouter);
Routes.use("/api", imagesRoutes);

// Routes.post("/api/add-tag", async (req, res) => {
//   const tagValue = req.body.tag;
//   console.log("hererer tags ");
//   await tag.create({ tag: tagValue }).then((tagDoc) => {
//     console.log(tagDoc);
//     res.json({ data: tagDoc });
//   });
// });

export default Routes;
