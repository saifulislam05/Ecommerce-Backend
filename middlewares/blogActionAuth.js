import blogModel from "../models/blog.js";

const blogActionAuth = async (req, res, next) => {
  const { user } = req;

  try {
    // Fetching the blog along with the author's information to check ownership and roles.
    const blog = await blogModel
      .findById(req.params.blogid)
      .populate("author", "_id role");

    // Handling the case when the blog does not exist.
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "blog not found",
      });
    }

    // Check for authorization before allowing changes in blog.
    const isblogOwner =
      user._id.toString() === blog?.author?._id.toString();
    const isAdminActioner = user.role === "admin";
    const isAuthorAdmin = blog?.author?.role === "admin";

    // If the author is an admin, only they can delete the blog. Otherwise, both the blog owner and an admin can do it.
    if (
      (isAuthorAdmin && !isblogOwner) ||
      (!isAuthorAdmin && !isblogOwner && !isAdminActioner)
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this Operation",
      });
    }
      
      // Access Granted
      next();
  } catch (error) {
    console.error("Error blogActionAuth blog:", error);
    res.status(500).json({
      success: false,
      message: "There was a problem to perform this operation",
    });
  }
};

export default blogActionAuth;
