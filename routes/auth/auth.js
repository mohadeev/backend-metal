import express from "express";
import AuthToken from "../../utils/verify-user/VerifyUser.js";
import routerSignIn from "./signin/signin.js";
import routerSignUp from "./signup/signup.js";
import User from "../../db/schema/user.js";

const routesAuth = express.Router();

routesAuth.use("/auth/sign-in", routerSignIn);
routesAuth.use("/auth/sign-up", routerSignUp);
routesAuth.get("/get/user-data/:token", AuthToken, (req, res) => {
  const useId = req.userId;
  User.findOne({ _id: useId }).then((userData) => {
    //console.log(userData);
    if (userData) {
      res.json({ responseData: userData });
    }
  });
});
export default routesAuth;
