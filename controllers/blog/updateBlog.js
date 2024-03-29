import blogModel from "../../models/blog.js";

const updateblog = async (req, res) => {
  const { blogid } = req.params;

  try {
    await blogModel.findByIdAndUpdate(blogid, req.body);
    res.json({
      success: true,
      message: "blog updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: `there is problem to updating blog`,
    });
  }
};

export default updateblog;