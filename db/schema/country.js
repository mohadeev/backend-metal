import mongoose from "mongoose";

const SchemaCountry = mongoose.Schema(
  {
    json: Object,
  },
  { timestamps: true }
);

const countryModal = mongoose.model("countries", SchemaCountry);
export default countryModal;
