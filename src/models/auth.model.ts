import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  googleId: String,
  createdAt: Date,
  updatedAt: Date,
});

export const User = mongoose.model("User", userSchema)