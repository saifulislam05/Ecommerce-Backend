import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  createdAt: {
    type: Date,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"users"
  },

  numViews: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],

  totalLikes: {
    type: Number,
    default: 0,
  },
  totalDisLikes: {
    type: Number,
    default: 0,
  },
});

const blogModel = mongoose.model("blogs", blogSchema);

export default blogModel;
