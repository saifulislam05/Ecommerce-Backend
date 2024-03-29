import blogModel from "../../models/blog.js";

const getBlogById = async (req, res) => {
  const { blogid } = req.params;
  try {
    const blog = await blogModel
      .findById(blogid)
      .populate({
        path: "author",
        select: "-_id firstname lastname",
      })
      .populate({
        path: "likes",
        select: "-_id firstname lastname",
      })
      .populate({
        path: "dislikes",
        select: "-_id firstname lastname",
      });
    
    res.json({
      success: true,
      message: "blog fetched successfully",
      result: blog,
    });

    // update view count
     await blogModel.findByIdAndUpdate(blogid, { $inc: { numViews: 1 } });

  } catch (error) {
    console.log("Error fetching blog----", error);
    res.status(500).json({
      success: true,
      message: `there is problem to fetching blog 1111`,
    });
  }
};

export default getBlogById;
