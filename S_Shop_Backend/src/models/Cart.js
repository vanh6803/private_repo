import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Accounts" },
    option: { type: mongoose.Schema.Types.ObjectId, ref: "Options" },
    quantity: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Carts", cartSchema);
