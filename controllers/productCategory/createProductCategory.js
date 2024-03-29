
import productCategoryModel from "../../models/productCategory.js";

const createProductCategory = async (req, res) => {
  try {
    const productCategoryObject = {
        ...req.body,
        createdBy: req.user._id,
        createdAt: Date.now()
    };

    await productCategoryModel.create(productCategoryObject);

    res.json({
      success: true,
      message: "ProductCategory created successfully",
    });
  } catch (error) {
    console.log("Error creating ProductCategory-------", error);
    res.status(500).json({
      success: false,
      message: `there is problem to create ProductCategory`,
    });
  }
};

export default createProductCategory;
