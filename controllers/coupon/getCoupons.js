import couponModel from "../../models/coupon.js";

const getCoupons = async (req, res) => {

  try {
    const coupons = await couponModel.find().populate("createdBy", "firstname lastname role");;
    if (!coupons) {
     return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }
    console.log("CouponsResult------", coupons);
    res.json({
      success: true,
      message: "Coupon retrieved successfully",
      coupons
    });
  } catch (error) {
    console.log("Error getting coupons---", error);
    res.status(500).json({
      success: false,
      message: "Error getting coupons",
    });
  }
};

export default getCoupons;
