import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true },
    accountType: { type: String, required: true },
    companyName: { type: String },
    numberOfEmployees: { type: Number },
    acceptTerms: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model("user", userSchema);
