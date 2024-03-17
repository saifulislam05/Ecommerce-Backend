import productModel from "../../models/product.js";

const getProductById = async (req, res) => {
  console.log(req.params.productid);
  try {
    const product = await productModel.findById(req.params.productid);
    res.json({
      success: true,
      message: "product fetched successfully",
      result: product,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: `there is problem to fetching product`,
    });
  }
};

export default getProductById;
