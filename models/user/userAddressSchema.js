import mongoose from "mongoose";

const userAddressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: false,
    default: "",
  },
  landmark: {
    type: String,
    required: false,
    default: "",
  },
  city: {
    type: String,
    required: false,
    default: "",
  },
  state: {
    type: String,
    required: false,
    default: "",
  },
  pincode: {
    type: String,
    required: false,
    default: "",
  },

  country: {
    type: String,
    required: false,
    default: "India",
  },
});

export default userAddressSchema;