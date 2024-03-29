import couponModel from "../../models/coupon.js";

const deleteCoupon = async (req, res) => {
  const { couponId } = req.params;

  try {
    await couponModel.findByIdAndDelete(couponId);
    // console.log("updatedResult------", updatedResult);
    res.json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting coupon---", error);
    res.status(500).json({
      success: false,
      message: "Error deleting coupon",
    });
  }
};

export default deleteCoupon;
