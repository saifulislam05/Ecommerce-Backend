import mongoose from "mongoose";
import cartProductSchema from "./cartProductSchema.js";

const cartSchema = new mongoose.Schema({
    products: {
        type:[cartProductSchema]
    },
    cartTotal: {
        type: Number,
        required: true,
        default:0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }
})

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;