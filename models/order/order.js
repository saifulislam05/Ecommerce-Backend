import mongoose from "mongoose";
import cartProductSchema from "../cart/cartProductSchema.js";
import userAddressSchema from "../user/userAddressSchema.js";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  products: {
    type: [cartProductSchema],
    required: true,
  },
  actualPrice: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "coupons",
  },
  deliveryAddress: {
    type: userAddressSchema,
    required: true,
  },
  orderPlacedAt: {
    type: Date,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: [
      "placed",
      "packed",
      "shipped",
      "in_transit",
      "out_for_delivery",
      "delivered",
      "returned",
      "refund_awaited",
      "refund_initiated",
      "refund_received",
    ],
    required: true,
  },
  modeOfPayment: {
    type: String,
    required: true,
    enum: ["cod", "online"],
  },
  transactionId: {
    type: String,
    default: "",
  },
});

const orderModel = mongoose.model("orders", orderSchema);

export default orderModel;
