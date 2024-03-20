import cartModel from "../../models/cart/cart.js";

const getCarts = async (req, res) => {
  const userId = req.user._id;

  try {
    let userCart = await cartModel
      .findOne({ userId: req.user._id })
      .populate({
        path: "products.product",
        select: "title category -_id",
      })
      .select("-_id -userId -__v ");

    res.json({
      success: true,
      message: "Carts retrieved successfully",
      data: userCart,
    });
  } catch (error) {
    console.error("Error retrieving cart:", error.message);
    res.status(500).json({
      success: false,
      message: "Error retrieving cart",
    });
  }
};

export default getCarts;
