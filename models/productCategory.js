import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"users"
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const productCategoryModel = mongoose.model(
  "productCategory",
  productCategorySchema
);

export default productCategoryModel;
