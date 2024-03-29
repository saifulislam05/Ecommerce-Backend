import productCategoryModel from "../../models/productCategory.js";

const updateProductCategory = async (req, res) => {
  const { productCategoryId } = req.params;

  try {
    await productCategoryModel.findByIdAndUpdate(productCategoryId, req.body);
    res.json({
      success: true,
      message: "productCategory updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: `there is problem to updating productCategory`,
    });
  }
};

export default updateProductCategory;