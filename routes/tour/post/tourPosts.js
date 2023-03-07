import express from "express";
import AuthToken from "../../../utils/verify-user/VerifyUser.js";
import createNewTour from "./createNewProduct.js";
import initProduct from "./initProduct.js";
import uploadProductImages from "./uploadProductImages.js";
const tourPosts = express.Router();

const allRoutes = [
  {
    name: createNewTour,
    auth: true,
    rout: "/create-new-product/",
  },
  {
    name: initProduct,
    auth: true,
    rout: "/init-new-product/",
  },
  {
    name: uploadProductImages,
    auth: true,
    rout: "/upload-product-images/",
  },
  ,
];

allRoutes.map(({ name, auth, rout }) => {
  if (auth) {
    tourPosts.use(`/post/product${rout}:token`, AuthToken, name);
  } else {
    tourPosts.use(`/post/product${rout}`, name);
  }
});

export default tourPosts;
