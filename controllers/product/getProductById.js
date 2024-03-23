import productModel from "../../models/product.js";

const getProductById = async (req, res) => {
  const productid=req.params.productid
  try {
    const product = await productModel
      .findById(productid,{createdAt:0,__v:0})
      .populate({
        path: "seller",
        select: "-_id firstname lastname",
      })
      .populate({
        path: "likes",
        select: "-_id firstname lastname",
      })
      .populate({
        path: "dislikes",
        select: "-_id firstname lastname",
      })
      .populate({
        path: "reviews.userId",
        select: "-_id firstname lastname",
      });
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
