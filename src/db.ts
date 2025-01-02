import mongoose from "mongoose";
import dotenv from "dotenv";
import { Redis } from "ioredis";
dotenv.config()
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!, {
        dbName:process.env.MONGO_DB ?? "test"
    });

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("unable  to connect to mongodb", error);
  }
};

export const redis = new Redis("redis://default:Qc5UEOGltmT8lPT0OnYPiCgE5qmDTPma@redis-19676.c330.asia-south1-1.gce.redns.redis-cloud.com:19676")
export { connectDb };