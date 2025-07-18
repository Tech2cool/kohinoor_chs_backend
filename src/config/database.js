import mongoose from "mongoose";
import config from "./config.js";

const dburl = config.DB_URL;

const connectDatabase = async () => {
  try {
    await mongoose.connect(dburl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Couldn't connect to MongoDB:", error);
  }
};
export default connectDatabase;
