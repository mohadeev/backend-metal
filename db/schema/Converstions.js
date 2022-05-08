import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    members : { type: Array}
  },
  { timestamps: true }
);

const Message = mongoose.model("message", MessageSchema);
export default Message;
