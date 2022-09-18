import express from "express";
const contactForm = express.Router();
import sgMail from "@sendgrid/mail";

contactForm.post("/", async (req, res) => {
  console.log(req.body);
  console.log("SD");
  const SENDGRID_API_KEY =
    "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";

  sgMail.setApiKey(SENDGRID_API_KEY);
  const msg = {
    to: "urexcursion@gmail.com", // Change to your recipient
    from: "urexcursion@example.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.json({ data: "data" });
    })
    .catch((error) => {
      console.error(error);
    });
});

export default contactForm;
