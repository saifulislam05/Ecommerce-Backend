import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  colorAvailable: {
    type: [String]
  },
  tags: {
    type: [String]
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "users",
  },
  createdAt: {
    type: Date,
    required:true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: "users",
  },
  dislikes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "users",
  },
  totalLikes: {
    type: Number,
    default: 0,
  },
  totalDisLikes: {
    type: Number,
    default: 0,
  },
  reviews: {
      type: [{
        userId: {type:mongoose.Schema.Types.ObjectId,ref:"users"},
          rating: Number,
          comment:String,
    }],
    default: [],
    
  },
});

const productModel = mongoose.model("products", productSchema);

export default productModel;