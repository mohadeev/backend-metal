import express from "express";
import AuthToken from "../../../utils/verify-user/VerifyUser.js";
import allDeparments from "./allDeparments.js";

const departmentsRoutesGets = express.Router();
const allRoutes = [
  { name: allDeparments, rout: "/all-deparments/", auth: false },
];

allRoutes.map(({ name, auth, rout }) => {
  if (auth) {
    if (rout) {
      departmentsRoutesGets.use(
        `/get/departments${rout}:token`,
        AuthToken,
        name
      );
    } else {
      departmentsRoutesGets.use(`/`, name);
    }
  } else {
    departmentsRoutesGets.use(`/get/departments${rout}`, name);
  }
});

export default departmentsRoutesGets;
