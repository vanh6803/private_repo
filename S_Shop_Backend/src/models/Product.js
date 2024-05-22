import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    image: [{ type: String, required: true }],
    status: { type: String, required: true, enum: ["mới", "cũ"] }, //mới, cũ
    discounted: { type: Boolean, default: false }, //có giảm giá hay không
    is_active: { type: Boolean },
    screen: { type: String },
    camera: { type: String },
    chipset: { type: String },
    cpu: { type: String },
    gpu: { type: String },
    ram: { type: Number },
    rom: { type: Number },
    operatingSystem: { type: String },
    battery: { type: String },
    weight: { type: Number },
    connection: { type: String },
    specialFeature: { type: String },
    manufacturer: { type: String },
    other: { type: String },
    flag: { type: Boolean, default: true },
    option: [{ type: mongoose.Schema.Types.ObjectId, ref: "Options" }],
    review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
