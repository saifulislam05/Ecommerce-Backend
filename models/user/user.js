import mongoose from "mongoose";
import crypto from "crypto";


import userAddressSchema from "./userAddressSchema.js";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  wishlist: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "products",
  },
  address: {
    type: userAddressSchema,
  },
  token: String,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.methods.createPasswordResetToken = async function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
  return resettoken;
};
const userModel = mongoose.model("users", userSchema);

export default userModel;
