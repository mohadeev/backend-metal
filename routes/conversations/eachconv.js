import mongoose from "mongoose";
import User from "../../db/schema/user.js";

const eachConv = async (req, res) => {
  let str = req.path.slice(1);
  if (str.length >= 12 && str.length <= 24)
    await User.findOne({ _id: str }).then((userdoc) => {
      if (userdoc) {
        let data = userdoc;
        const username = data.username;
        let id = data._d;
        let image = data.image;
        // console.log(userdoc);

        res.json({ data: { username, id, image } });
      }
    });
};

export default eachConv;
