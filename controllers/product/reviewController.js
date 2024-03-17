import productModel from "../../models/product.js";

const reviewController = async (req, res) => {
  const { productid } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user._id;

  try {
    const productExists = await productModel.exists({ _id: productid });

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    const existingReviewIndex = await productModel.findOne({
      _id: productid,
      "reviews.userId": userId,
    });

    if (existingReviewIndex) {
      // Update the existing review
      const updateResult = await productModel.updateOne(
        { _id: productid, "reviews.userId": userId },
        { $set: { "reviews.$.rating": rating, "reviews.$.comment": comment } }
      );

      console.log("Review updateResult:", updateResult);
      return res.json({
        success: true,
        message: "Review updated successfully",
      });
    } else {
      // Add a new review
      const addResult = await productModel.findByIdAndUpdate(
        productid,
        { $push: { reviews: { userId, rating, comment } } },
        { new: true }
      );

      console.log("Review addResult:", addResult);
      return res.json({
        success: true,
        message: "Review added successfully",
      });
    }
  } catch (error) {
    console.error("Error in review controller:", error);
    return res.status(500).json({
      success: false,
      message: "There was a problem processing your review",
    });
  }
};

export default reviewController;
