import express from "express";
import AuthToken from "../../../utils/verify-user/VerifyUser.js";
import allProducts from "./allProducts.js";

const productGets = express.Router();

const allRoutes = [
  {
    name: allProducts,
    auth: true,
    rout: "/user-products/",
  },
];

allRoutes.map(({ name, auth, rout }) => {
  if (auth) {
    if (rout) {
      productGets.use(`/get/product${rout}:token`, AuthToken, name);
    } else {
      productGets.use(`/`, name);
    }
  } else {
    if (rout) {
      productGets.use(`/get/product${rout}`, name);
    } else {
      productGets.use(`/`, name);
    }
  }
});

export default productGets;
