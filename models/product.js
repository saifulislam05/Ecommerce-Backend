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
    } 
    
})

const productModel = mongoose.model("products", productSchema);

export default productModel;