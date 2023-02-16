import express from "express";
import AuthToken from "../../../utils/verify-user/VerifyUser.js";
import createNewTour from "./createNewProduct.js";
const tourPosts = express.Router();

const allRoutes = [
  {
    name: createNewTour,
    auth: true,
    rout: "/create-new-product/",
  },
];

allRoutes.map(({ name, auth, rout }) => {
  if (auth) {
    tourPosts.use(`/post/product${rout}:token`, AuthToken, name);
  } else {
    tourPosts.use(`/post/product${rout}`, name);
  }
});

export default tourPosts;
