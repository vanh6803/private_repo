import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    note: { type: String, require: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Banners", bannerSchema);
