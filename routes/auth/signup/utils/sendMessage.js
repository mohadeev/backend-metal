import handlebars from "handlebars";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import sendgrid from "@sendgrid/mail";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// console.log("dd", dd());
const sendMessage = async () => {
  const SENDGRID_API_KEY =
    "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";
  sendgrid.setApiKey(SENDGRID_API_KEY);

  var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
      if (err) {
        throw err;
        callback(err);
      } else {
        callback(null, html);
      }
    });
  };
  readHTMLFile(path.join(__dirname, "/", "template.html"), (err, html) => {
    var template = handlebars.compile(html);
    var data = {
      email_title: "Alan",
      hometown: "Somewhere, TX",
      kids: [
        { name: "Jimmy", age: "12" },
        { name: "Sally", age: "4" },
      ],
    };
    var result = template(data);
    const msg = {
      to: '"Company Website" <urexcursion@gmail.com>',
      from: "urexcursion@gmail.com",
      subject: "Sd",
      text: "sdsldñdñlsñldsñldñlsd",
      html: result,
      //result,
    };
    sendgrid
      .send(msg)
      .then(() => {
        console.log("Email sent");
        // res.json("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  });
};
export default sendMessage;
