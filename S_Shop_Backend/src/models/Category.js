import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    image: { type: String },
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
    flag: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Categories", categorySchema);
