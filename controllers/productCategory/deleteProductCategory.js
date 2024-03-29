import productCategoryModel from "../../models/productCategory.js";

const deleteProductCategory = async (req, res) => {
  const { productCategoryId } = req.params;

  try {
    await productCategoryModel.findByIdAndDelete(productCategoryId);
    res.json({
      success: true,
      message: "productCategory Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: `there is problem to deleting productCategory`,
    });
  }
};

export default deleteProductCategory;