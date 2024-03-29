import productCategoryModel from "../../models/productCategory.js";

const getProductCategoryById = async (req, res) => {
  try {
    const productCategory = await productCategoryModel
      .findById(req.params.productCategoryId)
      .populate({
        path: "createdBy",
        select: "firstname lastname",
      });
    if (!productCategory) {
      return res.status(404).json({
        success: false,
        message: `productCategory NotFound`,
      });
    }
    
    res.json({
      success: true,
      message: "productCategory fetched successfully",
      results: productCategory,
    });
  } catch (error) {
    console.log("Error fetchign productCategory-----",error);
    res.status(500).json({
      success: false,
      message: `there is problem to fetching productCategory`,
    });
  }
};

export default getProductCategoryById;
