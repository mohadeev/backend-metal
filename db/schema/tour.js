import mongoose from "mongoose";

const tourSchema = mongoose.Schema(
  {
    name: String,
    overview: String,
    images: String,
    Services: [],
    places: [],
    days: [],
    price: String,
    descount: String,
    depurte: String,
    end: String,
    reviews: [],
  },
  { timestamps: true }
);

const tourModal = mongoose.model("tour", tourSchema);
export default tourModal;
