import mongoose from "mongoose";

const userAddressSchema = new mongoose.Schema({
  address: String, 
  landmark: String,
  city: String,
  state: String,
  pincode: String,
  country: {
    type: String,
    default: "India", 
  },
});

export default userAddressSchema;
