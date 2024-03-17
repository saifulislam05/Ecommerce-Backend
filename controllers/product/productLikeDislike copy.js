import productModel from "../../models/product.js";

const productLikeDislike = async (req, res) => {
  const action = req.params.action;

  console.log("action", action);
  let updateObject;

  const productDetails = await productModel.findById(req.params.productid);
  // console.log(productDetails);

  if (!productDetails) {
    return res.status(404).json({
      success: false,
      message: "Product not Found",
    });
  }

  if (action === "like") {
    const liked = productDetails.likes.includes(req.user._id);
    const disLiked = productDetails.dislikes.includes(req.user._id);

    if (liked) {
      updateObject = {
        $pull: { likes: req.user._id },
        $inc: { totalLikes: -1 },
      };
    } else if (disLiked) {
      updateObject = {
        $push: { likes: req.user._id },
        $pull: { dislikes: req.user._id },
        $inc: { totalLikes: 1 },
        $inc: { totalDisLikes: -1 },
      };
    } else {
      updateObject = {
        $push: { likes: req.user._id },
        $inc: { totalLikes: 1 },
      };
    }
  } else if (action === "dislike") {
    const disLiked = productDetails.dislikes.includes(req.user._id);
    const liked = productDetails.likes.includes(req.user._id);

    // console.log(
    //   "Dislikes-------",
    //   productDetails.dislikes.includes(req.user._id)
    // );

    // console.log("user id------",req.user._id);
    // console.log("disliked or not ----",disLiked);

    if (disLiked) {
      updateObject = {
        $pull: { dislikes: req.user._id },
        $inc: { totalDisLikes: -1 },
      };
    } else if (liked) {
      updateObject = {
        $push: { dislikes: req.user._id },
        $pull: { likes: req.user._id },
        $inc: { totalLikes: -1 },
        $inc: { totalDisLikes: 1 },
      };
    } else {
      updateObject = {
        $push: { dislikes: req.user._id },
        $inc: { totalDisLikes: 1 },
      };
    }
  }

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.productid,
      updateObject
    );
    // console.log(updatedProduct);
    res.json({
      success: true,
      message: "product updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: `there is problem to updating product`,
    });
  }
};


export default productLikeDislike;;