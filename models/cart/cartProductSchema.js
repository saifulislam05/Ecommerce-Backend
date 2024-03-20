import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
  },
  color: {
    type: String,
  },
  price: {
    type: Number,
  },
  totalprice: {
    type: Number,
  },
});

export default cartProductSchema;
