import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    stock: {
        type: Number,
        required:true
    },
    brand: {
        type: String,
        required:true
    },
    category: {
        type: String,
        required:true
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref:"users"
    },
    dislikes: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref:"users"
    },
    totalLikes: {
        type: Number,
        required: false,
        default:0
    },
    totalDisLikes: {
        type: Number,
        required: false,
        default:0
    }
    
    
})

const productModel = mongoose.model("products", productSchema);

export default productModel;