import mongoose from "mongoose";

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
});

const userModel = mongoose.model("users", userSchema);

export default userModel;