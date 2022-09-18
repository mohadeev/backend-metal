import express from "express";
import AuthToken from "../../../utils/verify-user/VerifyUser.js";
import contactForm from "./contactForm.js";
const contactRoutesPosts = express.Router();

const allRoutes = [
  {
    name: contactForm,
    auth: false,
    rout: "/contact-form",
  },
];

allRoutes.map(({ name, auth, rout }) => {
  if (auth) {
    contactRoutesPosts.use(`/post/contact${rout}:token`, AuthToken, name);
  } else {
    contactRoutesPosts.use(`/post/contact${rout}`, name);
  }
});

export default contactRoutesPosts;
