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

    sender: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", MessageSchema);
export default Message;
