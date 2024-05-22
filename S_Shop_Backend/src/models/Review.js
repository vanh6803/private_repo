import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Accounts" },
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
    quantity: { type: Number },
    flag: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Reviews", reviewSchema);
