import mongoose from "mongoose";

const tourSchema = mongoose.Schema(
  {
    name: String,
    overview: String,
    images: [],
    Services: [],
    places: [],
    days: [],
    price: String,
    descount: String,
    start: { id: String, name: String },
    end: { id: String, name: String },
    reviews: [],
  },
  { timestamps: true }
);

const tourModal = mongoose.model("tour", tourSchema);
export default tourModal;
