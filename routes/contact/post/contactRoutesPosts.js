import express from "express";
import AuthToken from "../../../utils/verify-user/VerifyUser.js";
import contactForm from "./contactForm.js";
import newsLatter from "./newsLatter.js";
const contactRoutesPosts = express.Router();

const allRoutes = [
  {
    name: contactForm,
    auth: false,
    rout: "/contact-form",
  },
  {
    name: newsLatter,
    auth: false,
    rout: "/news-latter",
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
