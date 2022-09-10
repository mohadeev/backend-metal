import express from "express";
import AuthToken from "../../../utils/verify-user/VerifyUser.js";
import allDestinations from "./allDestinations.js";

const destinationRoutesGets = express.Router();

const allRoutes = [
  {
    name: allDestinations,
    auth: false,
  },
];

allRoutes.map(({ name, auth, rout }) => {
  if (auth) {
    if (rout) {
      destinationRoutesGets.use(`/get/chanel${rout}:token`, AuthToken, name);
    } else {
      destinationRoutesGets.use(`/`, name);
    }
  } else {
    if (rout) {
      destinationRoutesGets.use(`/get/video${rout}`, name);
    } else {
      destinationRoutesGets.use(`/`, name);
    }
  }
});

export default destinationRoutesGets;
