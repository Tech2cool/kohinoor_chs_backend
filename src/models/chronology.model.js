import mongoose from "mongoose";

export const chronologySchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: null },
  docs: [{ type: String, required: true }],
});
const chronoModel = mongoose.model(
  "chronology",
  chronologySchema,
  "chronology"
);
export default chronoModel;
