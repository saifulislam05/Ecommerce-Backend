import productModel from "../models/product.js";

const createProduct = async (req, res) => {
  try {
    const newProduct = await productModel.create(req.body);
    res.json({
      success: true,
      message: "product created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: `there is problem to create product`,
    });
  }
};

const updateProduct = async (req, res) => {
  console.log("params", req.params);
  console.log("body", req.body);
  try {
    await productModel.findByIdAndUpdate(req.params.productid, req.body);
    res.json({
      success: true,
      message: "product updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: `there is problem to create product`,
    });
  }
};

export { createProduct, updateProduct };
