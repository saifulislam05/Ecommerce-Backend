import productModel from "../../models/product.js";

const productLikeDislike = async (req, res) => {
  const { action, productid } = req.params;
  const userId = req.user._id;

  try {
    const productDetails = await productModel.findById(productid);
    if (!productDetails) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const liked = productDetails.likes.includes(userId);
    const disLiked = productDetails.dislikes.includes(userId);

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

    await productModel.findByIdAndUpdate(productid, updateObject);

    return res.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product like/dislike:", error);
    res.status(500).json({
      success: false,
      message: "There is a problem updating product",
    });
  }
};

export default productLikeDislike;
