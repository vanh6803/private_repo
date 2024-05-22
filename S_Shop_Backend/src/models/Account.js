import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String },
    avatar: { type: String },
    username: { type: String },
    fullName: { type: String },
    birthday: { type: String },
    token: { type: String },
    isVerify: { type: Boolean, default: false },
    confirmationCode: { type: String },
    confirmationExpiration: { type: Date },
    is_active: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ["admin", "customer", "staff"],
      default: "customer",
    },
    flag: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Accounts", accountSchema);
