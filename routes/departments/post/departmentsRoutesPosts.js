import express from "express";
import AuthToken from "../../../utils/verify-user/VerifyUser.js";
import crearteNewDeprtment from "./crearteNewDeprtment.js";

const departmentsRoutesPosts = express.Router();

const allRoutes = [
  {
    name: crearteNewDeprtment,
    auth : true ,
    rout : "/save-dpartments/"
  },
];

allRoutes.map(({ name, auth, rout }) => {
  if (auth) {
    if (rout) {
      departmentsRoutesPosts.use(
        `/post/dpartments${rout}:token`,
        AuthToken,
        name
      );
    } else {
      departmentsRoutesPosts.use(`/`, name);
    }
  } else {
    departmentsRoutesPosts.use(`/post/dpartments${rout}:token`, name);
  }
});

export default departmentsRoutesPosts;
