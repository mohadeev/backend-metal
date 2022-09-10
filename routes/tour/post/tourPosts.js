import express from "express";
import AuthToken from "../../../utils/verify-user/VerifyUser.js";
import createNewTour from "./createNewTour.js";
const tourPosts = express.Router();

const allRoutes = [
  {
    name: createNewTour,
    auth: false,
    rout: "/create-new-tour",
  },
];

allRoutes.map(({ name, auth, rout }) => {
  if (auth) {
    tourPosts.use(`/post/channel${rout}:token`, AuthToken, name);
  } else {
    tourPosts.use(`/post/tour${rout}`, name);
  }
});

export default tourPosts;
