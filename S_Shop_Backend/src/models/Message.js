import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accounts",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accounts",
      required: true,
    },
    message: { type: String },
    // image: [{ type: String }],
    flag: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Messages", messageSchema);
