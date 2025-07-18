import mongoose from "mongoose";

export const flatSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: null,
  },
  name: { type: String, default: null },
  buildingNo: { type: Number, required: true },
  floor: { type: Number, required: true },
  flatNo: { type: Number, required: true },
  unitNo: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  countryCode: { type: String, default: "+91" },
  society: { type: String, default: "" },
  societyName: { type: String, default: "" },
  refreshToken: { type: String, default: null },
  password: { type: String, default: null },
  role: {
    type: String,
    default: "resident",
  },
});
const flatModel = mongoose.model("flat", flatSchema, "flats");
export default flatModel;
