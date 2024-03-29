import blogModel from "../../models/blog.js";

const createBlog = async (req, res) => {
  try {
    const blogObject = {
      ...req.body,
      createdAt: Date.now(),
      author: req.user._id,
    };

    const newBlog = await blogModel.create(blogObject);

    // Convert the mongoose document to a plain JavaScript object
    let addedBlog = newBlog.toObject();

    // Remove the fields which not to includes in the response 
    delete addedBlog.likes;
    delete addedBlog.dislikes;
    delete addedBlog.numViews;
    delete addedBlog.totalLikes;
    delete addedBlog.totalDisLikes;
    res.json({
      success: true,
      message: "Blog created successfully",
      addedBlog,
    });
  } catch (error) {
    console.log("Error creating blog-------", error);
    res.status(500).json({
      success: false,
      message: `there is problem to create Blog`,
    });
  }
};

export default createBlog;
