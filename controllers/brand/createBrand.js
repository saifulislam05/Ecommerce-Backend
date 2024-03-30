
import brandModel from "../../models/brand.js";

const createbrand = async (req, res) => {
  try {
    const brandObject = {
      title: req.body.title,
      value: req.body.value.toLowerCase(),
      createdBy: req.user._id,
      createdAt: Date.now(),
    };

    await brandModel.create(brandObject);

    res.json({
      success: true,
      message: "brand created successfully",
    });
  } catch (error) {
    console.log("Error creating brand-------", error);
    res.status(500).json({
      success: false,
      message: `there is problem to create brand`,
    });
  }
};

export default createbrand;
