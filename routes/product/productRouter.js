import express from "express";
import productGets from "./get/productGets.js";

const productRouter = express.Router();
productRouter.use("/", productGets);

export default productRouter;
