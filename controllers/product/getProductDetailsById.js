import productModel from "../../models/product.js";

const getProductDetailsById = async (req, res) => {
  const { productid } = req.params;

  try {
    const product = await productModel
      .findById(productid)
      .populate({
        path: "likes",
        select: "_id firstname lastname",
      })
      .populate({
        path: "dislikes",
        select: "_id firstname lastname",
      });


    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }


    res.json({
      success: true,
      message: "Product fetched successfully",
      result: product,
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({
      success: false,
      message: "There was a problem fetching the product details",
    });
  }
};

export default getProductDetailsById;
