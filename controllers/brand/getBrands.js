import brandModel from "../../models/brand.js";

const getbrands = async (req, res) => {
  try {
    const brand = await brandModel.find(
      {},
      { createdBy:0 ,createdAt:0,__v:0}
    );
    res.json({
      success: true,
      message: "brands fetched successfully",
      results: brand,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: `there is problem to fetching brand`,
    });
  }
};

export default getbrands;
