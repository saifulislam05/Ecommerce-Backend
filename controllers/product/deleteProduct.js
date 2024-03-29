import productModel from "../../models/product.js";

const deleteProduct = async (req, res) => {
  try {
   
    await productModel.findByIdAndDelete(req.params.productid);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "There was a problem deleting the product",
    });
  }
};

export default deleteProduct;
