import productModel from "../../models/product.js";

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find({},{likes:0,dislikes:0,seller:0});
    res.json({
      success: true,
      message: "products fetched successfully",
      results: products,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: `there is problem to fetching product`,
    });
  }
};

export default getProducts;
