import mongoose from "mongoose";

const infoSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accounts",
      required: true,
    },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone_number: { type: String, required: true },
    checked: { type: Boolean, default: false },
    flag: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Infoes", infoSchema);
