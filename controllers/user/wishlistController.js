import userModel from "../../models/user.js";

// Function to add or remove a product from the wishlist
const toggleWishlistItem = async (userId, productId, existsInWishlist) => {
  const updateOperation = existsInWishlist
    ? { $pull: { wishlist: productId } }
    : { $push: { wishlist: productId } };
  await userModel.findByIdAndUpdate(userId, updateOperation);
};

// Wishlist Controller
const wishlistController = async (req, res) => {
  try {
    const { productid } = req.params;
    // Check if the product already exists in the user's wishlist
    const productExistToWishlist = req.user.wishlist.includes(productid);

    // Add or remove the product from the wishlist
    await toggleWishlistItem(req.user._id, productid, productExistToWishlist);

    // Determine the appropriate message based on the action performed
    const actionPerformed = productExistToWishlist
      ? "removed from"
      : "added to";
    res.status(200).json({
      success: true,
      message: `Product successfully ${actionPerformed} your wishlist.`,
    });
  } catch (error) {
    // Handle potential errors, such as database connection issues
    console.error("Wishlist update error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update wishlist. Please try again later.",
    });
  }
};

export default wishlistController;
