import express from "express";
import AuthToken from "../../../utils/verify-user/VerifyUser.js";
import createNewDestination from "./createNewDestination.js";
const destinationPosts = express.Router();

const allRoutes = [
  {
    name: createNewDestination,
    auth: false,
    rout: "/create-new-destination",
  },
];

allRoutes.map(({ name, auth, rout }) => {
  if (auth) {
    destinationPosts.use(`/post/destination${rout}:token`, AuthToken, name);
  } else {
    destinationPosts.use(`/post/destination${rout}`, name);
  }
});

export default destinationPosts;
