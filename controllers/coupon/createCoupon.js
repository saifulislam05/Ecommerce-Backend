import couponModel from "../../models/coupon.js";

const createCoupon = async (req, res) => {
  try {
    const createdResult = await couponModel.create(req.body);
    console.log("createdResult------", createdResult);
    res.json({
      success: true,
      message: "Coupon created successfully",
    });
  } catch (error) {
    console.log("Error creating coupon---", error);
    res.status(500).json({
      success: false,
      message: "Error creating coupon",
    });
  }
};

export default createCoupon;
