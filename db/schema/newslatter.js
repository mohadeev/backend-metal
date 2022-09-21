import mongoose from "mongoose";

const SchemaNewsLatter = mongoose.Schema(
  {
    email: String,
    subscribed: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const newsLatterModal = mongoose.model("newslatter", SchemaNewsLatter);
export default newsLatterModal;
