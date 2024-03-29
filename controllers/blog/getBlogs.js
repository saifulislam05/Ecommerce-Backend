import blogModel from "../../models/blog.js";

const getblogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({},{likes:0,dislikes:0,seller:0});
    res.json({
      success: true,
      message: "blogs fetched successfully",
      results: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: `there is problem to fetching blog`,
    });
  }
};

export default getblogs;
