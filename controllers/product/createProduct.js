import productModel from "../../models/product.js";

const createProduct = async (req, res) => {

  const productObject = {
    ...req.body,
    createdAt: Date.now(),
    seller:req.user._id
  };

  try {
    const newProduct = await productModel.create(productObject);
    res.json({
      success: true,
      message: "product created successfully",
      addedProduct:newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: `there is problem to create product`,
    });
  }
};

export default createProduct;