import couponModel from "../../models/coupon.js";

const getCouponByCode = async (req, res) => {
  const couponCode = req.body.couponCode;
  try {
    const coupon = await couponModel.findOne({ couponCode });
    if (!coupon) {
     return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }
    console.log("createdResult------", coupon);
    res.json({
      success: true,
      message: "Coupon retrieved successfully",
      coupon:coupon
    });
  } catch (error) {
    console.log("Error getting coupon---", error);
    res.status(500).json({
      success: false,
      message: "Error getting coupon",
    });
  }
};

export default getCouponByCode;
