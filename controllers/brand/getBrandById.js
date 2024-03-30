import brandModel from "../../models/brand.js";

const getbrandById = async (req, res) => {
  try {
    const brand = await brandModel
      .findById(req.params.brandId)
      .populate({
        path: "createdBy",
        select: "firstname lastname",
      });
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: `brand NotFound`,
      });
    }
    
    res.json({
      success: true,
      message: "brand fetched successfully",
      results: brand,
    });
  } catch (error) {
    console.log("Error fetchign brand-----",error);
    res.status(500).json({
      success: false,
      message: `there is problem to fetching brand`,
    });
  }
};

export default getbrandById;
