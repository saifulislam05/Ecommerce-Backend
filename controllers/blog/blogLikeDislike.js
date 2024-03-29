import blogModel from "../../models/blog.js";

const blogLikeDislike = async (req, res) => {
  const { action, blogid } = req.params;
  const userId = req.user._id;

  try {
    const blogDetails = await blogModel.findById(blogid);
    if (!blogDetails) {
      return res.status(404).json({
        success: false,
        message: "blog not found",
      });
    }

    const liked = blogDetails.likes.includes(userId);
    const disLiked = blogDetails.dislikes.includes(userId);

    let updateObject = {};

    if (action === "like") {
      if (liked) {
        updateObject = {
          $pull: { likes: userId },
          $inc: { totalLikes: -1 },
        };
      } else {
        updateObject = {
          $push: { likes: userId },
          $inc: { totalLikes: 1 },
        };

        if (disLiked) {
          updateObject.$pull = { dislikes: userId };
          updateObject.$inc.totalDisLikes = -1;
        }
      }
    } else if (action === "dislike") {
      if (disLiked) {
        updateObject = {
          $pull: { dislikes: userId },
          $inc: { totalDisLikes: -1 },
        };
      } else {
        updateObject = {
          $push: { dislikes: userId },
          $inc: { totalDisLikes: 1 },
        };

        if (liked) {
          updateObject.$pull = { likes: userId };
          updateObject.$inc.totalLikes = -1;
        }
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid action",
      });
    }

    await blogModel.findByIdAndUpdate(blogid, updateObject);

    return res.json({
      success: true,
      message: "blog updated successfully",
    });
  } catch (error) {
    console.error("Error updating blog like/dislike:", error);
    res.status(500).json({
      success: false,
      message: "There is a problem updating blog",
    });
  }
};

export default blogLikeDislike;
