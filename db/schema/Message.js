import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    conversationId: String,
    message: {
      type: String,
      required: true,
    },

    sender: {
      type: String,
    },
    unread: { Boolean, default: false },
    to: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", MessageSchema);
export default Message;
