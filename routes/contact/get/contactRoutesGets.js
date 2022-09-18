import express from "express";
import AuthToken from "../../../utils/verify-user/VerifyUser.js";
import allDestinations from "./allDestinations.js";

const contactRoutesGets = express.Router();

const allRoutes = [
  {
    name: allDestinations,
    auth: false,
  },
];

allRoutes.map(({ name, auth, rout }) => {
  if (auth) {
    if (rout) {
      contactRoutesGets.use(`/get/chanel${rout}:token`, AuthToken, name);
    } else {
      contactRoutesGets.use(`/`, name);
    }
  } else {
    if (rout) {
      contactRoutesGets.use(`/get/video${rout}`, name);
    } else {
      contactRoutesGets.use(`/`, name);
    }
  }
});

export default contactRoutesGets;
