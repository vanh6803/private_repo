import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    nameColor: { type: String },
    image: { type: String },
    price: { type: Number },
    discountValue: { type: Number, default: 0 },
    quantity: { type: Number }, // số lượng của sản phẩm
    soldQuantity: { type: Number, default: 0 }, // số lượng đã bán
    flag: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Options", optionSchema);
