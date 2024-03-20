import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
  product: { // product Id
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"products"
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
