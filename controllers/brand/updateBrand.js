import brandModel from "../../models/brand.js";

const updatebrand = async (req, res) => {
  const { brandId } = req.params;

  try {
    const updateObject = {
      title: req.body.title,
      value: req.body.value.toLowerCase(),
      createdBy: req.user._id,
    };
    const updatedBrand = await brandModel.findByIdAndUpdate(brandId, updateObject);
    
    if (!updatedBrand) {
      return res.status(404).json({
        success: false,
        message: `Brand notFound`,
      });
    }
    res.json({
      success: true,
      message: "brand updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `there is problem to updating brand`,
    });
  }
};

export default updatebrand;
