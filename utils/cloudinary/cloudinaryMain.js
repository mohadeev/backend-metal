import dotenv from "dotenv";
import cloudinary from "cloudinary";

dotenv.config();

const cloudinaryMain = cloudinary.config({
  cloud_name: "mohadeev",
  api_key: "823672526525528",
  api_secret: "FpKV7PxTxEMmBdq0Ig-P_gjw__s",
  cloudinary_url:
    "cloudinary://823672526525528:FpKV7PxTxEMmBdq0Ig-P_gjw__s@mohadeev",
});

export default cloudinaryMain;
