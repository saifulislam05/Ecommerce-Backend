import couponModel from "../models/coupon.js";

const couponActionAuth = async (req, res, next) => {
  const { user } = req;

  try {
    // Fetching the coupon along with the createdBy's information to check ownership and roles.
    const coupon = await couponModel
      .findById(req.params.couponId)
      .populate("createdBy", "_id role");

    // Handling the case when the coupon does not exist.
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "coupon not found",
      });
    }

    // Check for authorization before allowing changes in coupon.
    const iscouponOwner =
      user._id.toString() === coupon?.createdBy?._id.toString();
    const isAdminActioner = user.role === "admin";
    const iscreatedByAdmin = coupon?.createdBy?.role === "admin";

    // If the createdBy is an admin, only they can delete the coupon. Otherwise, both the coupon owner and an admin can do it.
    if (
      (iscreatedByAdmin && !iscouponOwner) ||
      (!iscreatedByAdmin && !iscouponOwner && !isAdminActioner)
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this Operation",
      });
    }
      
      // Access Granted
      next();
  } catch (error) {
    console.error("Error couponActionAuth coupon:", error);
    res.status(500).json({
      success: false,
      message: "There was a problem to perform this operation",
    });
  }
};

export default couponActionAuth;
