import express from "express";
import AuthToken from "../../../utils/verify-user/VerifyUser.js";
import uplaodImage from "./uplaodImage.js";
const imagesPostsRouts = express.Router();

const allRoutes = [
  {
    name: uplaodImage,
    auth: false,
  },
];

allRoutes.map(({ name, auth, rout }) => {
  if (auth) {
    if (rout) {
      imagesPostsRouts.use(`/post/chanel${rout}:token`, AuthToken, name);
    } else {
      imagesPostsRouts.use(`/`, name);
    }
  } else {
    imagesPostsRouts.use(`/`, name);
  }
});

export default imagesPostsRouts;
