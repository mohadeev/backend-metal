import express from "express";
const contactForm = express.Router();
import sgMail from "@sendgrid/mail";

contactForm.post("/", async (req, res) => {
  console.log(req.body);

  const SENDGRID_API_KEY =
    "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";

  sgMail.setApiKey(SENDGRID_API_KEY);
  const msg = {
    to: req.body.email, // Change to your recipient
    from: "urexcursion@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.json("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
});

export default contactForm;
