import mongoose from "mongoose";

const departmentsSchema = mongoose.Schema(
  {
    departments: [],
  },
  { timestamps: true }
);

const departmentsModal = mongoose.model("departments", departmentsSchema);
export default departmentsModal;
