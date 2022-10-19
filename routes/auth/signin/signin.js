import express from "express";
import mongoose from "mongoose";
const routerSignIn = express.Router();
import User from "../../../db/schema/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMessage from "../signup/utils/sendMessage.js";

routerSignIn.post("/", async (req, res) => {
  const { password, email } = req.body;
  console.log(req.body);
  await User.findOne({ email: email }).then((docadded) => {
    if (docadded) {
      console.log(docadded);
      bcrypt.compare(password, docadded.password).then(async (result) => {
        if (result) {
          const id = docadded._id.toString("hex");
          const accessToken = jwt.sign(id, process.env.ACCESS_TOKEN_SECRET);
          const user = { email: email, accessToken: accessToken };
          const reqUser = req.user;
          if (typeof reqUser === "undefined") {
            req.userId = id;
            req.userEmail = email;
            console.log(req.userId);
          }
          await sendMessage(email);
          res.json({
            message: "you successfully log in",
            user: user,
          });
        } else {
          res.json({
            message: "WrongPassWord",
          });
        }
      });
    } else if (!docadded) {
      res.json({
        message: "EamilNotFinded",
      });
    }
  });
});

export default routerSignIn;
