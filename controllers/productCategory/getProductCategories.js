import productCategoryModel from "../../models/productCategory.js";

const getproductCategorys = async (req, res) => {
  try {
    const productCategories = await productCategoryModel.find(
      {},
      { createdBy:0 ,createdAt:0,__v:0}
    );
    res.json({
      success: true,
      message: "productCategorys fetched successfully",
      results: productCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: `there is problem to fetching productCategory`,
    });
  }
};

export default getproductCategorys;
