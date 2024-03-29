import blogModel from "../../models/blog.js";

const deleteblog = async (req, res) => {
  try {
   
    await blogModel.findByIdAndDelete(req.params.blogid);

    res.json({
      success: true,
      message: "blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({
      success: false,
      message: "There was a problem deleting the blog",
    });
  }
};

export default deleteblog;
