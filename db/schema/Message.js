import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", MessageSchema);
export default Message;
