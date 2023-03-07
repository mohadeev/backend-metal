import express from "express";
import mongoose from "mongoose";
import productModal from "../../../db/schema/productModal.js";
import resFuncError from "../../../utils/resFuncError.js";

const createNewTour = express.Router();

createNewTour.post("/", async (req, res) => {
  const userId = req.userId;
  const prId = req.body.prId;
  // console.log(req.body);
  if (mongoose.Types.ObjectId.isValid(prId)) {
    productModal
      .findOne({ _id: prId, creator: userId })
      .then(async (prFinded) => {
        if (prFinded) {
          const data = req.body?.productData;
          console.log("data", data);
          const title = data.title;
          const descreption = data?.descreption;
          const priceData = data?.priceData;
          const currency = priceData?.currency;
          const price = priceData?.price;
          const descount = data?.descount;
          const catigory = data?.catigory;
          const subcatigory = data?.subcatigory;
          const images = data?.images;
          // const resFuncError res,= (errorMessage) => {
          //   console.log("errorMessage", errorMessage);
          //   res.json({ error: true, errorMessage: errorMessage });
          // };
          if (typeof data !== "undefined") {
            if (typeof title === "undefined" || title.length <= 5) {
              resFuncError(res, "TITLE-ERROR");
            } else if (
              typeof descreption === "undefined" ||
              descreption.length <= 10
            ) {
              resFuncError(res, "DESCRESPTION-ERROR");
            } else if (typeof price === "undefined" || price.length <= 0) {
              resFuncError(res, "PRICE-ERROR");
            } else if (
              typeof currency === "undefined" ||
              currency.length <= 2
            ) {
              resFuncError(res, "CURRENY-ERROR");
            } else if (
              typeof currency === "undefined" ||
              currency.length <= 2
            ) {
            } else {
              console.log("product will creat from here");
              try {
                let update = prFinded;
                update.productData = data;
                console.log(update);
                const filter = {
                  creator: userId,
                  _id: mongoose.Types.ObjectId(prId),
                };
                await productModal.updateOne(filter, update);
                console.log("updated");
              } catch (error) {
                console.log(error);
              }
              // productModal
              //   .create({ creator: userId, productData: data })
              //   .then((tour) => {
              //     console.log(tour);
              //     res.json({ sdf: "SD" });
              //   });
            }
          } else {
            resFuncError(res, "PRODUCT-DATA-ERROR");
          }
          // productModal.create(data).then((tour) => {
          //   console.log(tour);
          //   res.json({ sdf: "SD" });
          // });
        } else {
          resFuncError(res, "NOT-PRODUCT-FINDED");
        }
      });
  } else {
    resFuncError(res, "NOT-PRODUCT-ID-FINDED-ERROR");
  }
});

export default createNewTour;
