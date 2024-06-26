import productModel from "../../models/product.js";

const updateProduct = async (req, res) => {
  try {
    await productModel.findByIdAndUpdate(req.params.productid, req.body);
    res.json({
      success: true,
      message: "product updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: `there is problem to updating product`,
    });
  }
};

export default updateProduct;