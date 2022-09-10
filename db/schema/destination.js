import mongoose from "mongoose";

const destinationSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    country: { type: String, default: "Morocco" },
    currency: { type: String, default: "MAD" },
    images: [],
    places: [],
  },
  { timestamps: true }
);

const destinationModal = mongoose.model("destination", destinationSchema);
export default destinationModal;
