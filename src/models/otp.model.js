import mongoose from "mongoose";

export const otpSchema = new mongoose.Schema(
  {
    otp: { type: String, required: true },
    docId: { type: String, required: true },
    email: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    type: { type: String, default: null },
    message: { type: String, default: "otp" },
    createdAt: { type: Date, default: Date.now, expires: 300 },
  },
  { timestamps: true }
);

const otpModel = mongoose.model("otp", otpSchema, "otps");
export default otpModel;
