import productModel from "../models/product.js";

const productActionAuth = async (req, res, next) => {
  const { user } = req;

  try {
    // Fetching the product along with the seller's information to check ownership and roles.
    const product = await productModel
      .findById(req.params.productid)
      .populate("seller", "_id role");

    // Handling the case when the product does not exist.
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check for authorization before allowing changes in product.
    const isProductOwner =
      user._id.toString() === product?.seller?._id.toString();
    const isAdminActioner = user.role === "admin";
    const isSellerAdmin = product?.seller?.role === "admin";

    // If the seller is an admin, only they can delete the product. Otherwise, both the product owner and an admin can do it.
    if (
      (isSellerAdmin && !isProductOwner) ||
      (!isSellerAdmin && !isProductOwner && !isAdminActioner)
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this Operation",
      });
      }
      
      // Access Granted
      next();
  } catch (error) {
    console.error("Error ProductActionAuth product:", error);
    res.status(500).json({
      success: false,
      message: "There was a problem to perform this operation",
    });
  }
};

export default productActionAuth;
