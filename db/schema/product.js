import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    productData: {
      title: String,
      descreption: String,
      images: [],
      services: [],
      priceData: { currency: {}, price: String, descount: String },
      catigory: {},
      subcatigory: {},
      other: {},
    },
    creator: String,
  },
  { timestamps: true }
);

const productModal = mongoose.model("product", productSchema);
export default productModal;
