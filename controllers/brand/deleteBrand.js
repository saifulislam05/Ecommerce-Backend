import brandModel from "../../models/brand.js";

const deletebrand = async (req, res) => {
  const { brandId } = req.params;

  try {
    await brandModel.findByIdAndDelete(brandId);
    res.json({
      success: true,
      message: "brand Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: `there is problem to deleting brand`,
    });
  }
};

export default deletebrand;