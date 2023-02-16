import express from "express";
import productModal from "../../../db/schema/product.js";

const createNewTour = express.Router();

createNewTour.post("/", async (req, res) => {
  const userId = req.userId;
  console.log(req.body);
  const data = req.body?.productData;
  const title = data.title;
  const descreption = data?.descreption;
  const priceData = data?.priceData;
  const currency = priceData?.currency;
  const price = priceData?.price;
  const descount = data?.descount;
  const catigory = data?.catigory;
  const subcatigory = data?.subcatigory;
  const images = data?.images;
  const resErroFunc = (errorMessage) => {
    console.log("errorMessage", errorMessage);
    res.json({ error: true, errorMessage: errorMessage });
  };
  if (typeof data !== "undefined") {
    if (typeof title === "undefined" || title.length <= 5) {
      resErroFunc("TITLE-ERROR");
    } else if (typeof descreption === "undefined" || descreption.length <= 10) {
      resErroFunc("DESCRESPTION-ERROR");
    } else if (typeof price === "undefined" || price.length <= 0) {
      resErroFunc("PRICE-ERROR");
    } else if (typeof currency === "undefined" || currency.length <= 2) {
      resErroFunc("CURRENY-ERROR");
    } else if (typeof currency === "undefined" || currency.length <= 2) {
    } else {
      console.log("product will creat from here");
      
      res.json({});
    }
  } else {
    resErroFunc("PRODUCT-DATA-ERROR");
  }
  // productModal.create(data).then((tour) => {
  //   console.log(tour);
  //   res.json({ sdf: "SD" });
  // });
});

export default createNewTour;
