import couponModel from "../../models/coupon.js";

const updateCoupon = async (req, res) => {
  const { couponId } = req.params;

  try {

    const updatedResult = await couponModel.findByIdAndUpdate(
      couponId,
      req.body
    );
    console.log("updatedResult------", updatedResult);
    res.json({
      success: true,
      message: "Coupon updated successfully",
    });
  } catch (error) {
    console.log("Error updating coupon---", error);
    res.status(500).json({
      success: false,
      message: "Error updating coupon",
    });
  }
};

export default updateCoupon;
