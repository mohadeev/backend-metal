import express from "express";
const newsLatter = express.Router();
import sgMail from "@sendgrid/mail";
import newsLatterModal from "../../../db/schema/newslatter.js";

newsLatter.post("/", async (req, res) => {
  console.log(req.body);
  const Email = req.body.email;
  if (Email) {
    await newsLatterModal.create({ email: Email }).then((data) => {
      console.log(data);
      res.json({ responseData: true });
    });
  }
});

export default newsLatter;
