import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "products",
  },
  quantity: {
    type: Number,
    required: true,
    default: 1, 
  },
  color: {
    type: String,
    required: false, 
  },
  price: {
    type: Number,
    required: true,
  },
  totalprice: {
    type: Number,
    required: true,
  },
});

export default cartProductSchema;
