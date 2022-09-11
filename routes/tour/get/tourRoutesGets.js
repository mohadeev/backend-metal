import express from "express";
import AuthToken from "../../../utils/verify-user/VerifyUser.js";
import allTours from "./allTours.js";
import tourData from "./tourData.js";

const tourRoutesGets = express.Router();

const allRoutes = [
  {
    name: allTours,
    auth: false,
  },
  {
    name: tourData,
    auth: false,
  },
  
];

allRoutes.map(({ name, auth, rout }) => {
  if (auth) {
    if (rout) {
      tourRoutesGets.use(`/get/chanel${rout}:token`, AuthToken, name);
    } else {
      tourRoutesGets.use(`/`, name);
    }
  } else {
    if (rout) {
      tourRoutesGets.use(`/get/video${rout}`, name);
    } else {
      tourRoutesGets.use(`/`, name);
    }
  }
});

export default tourRoutesGets;
