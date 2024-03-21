import couponModel from "../../models/coupon.js";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween.js";
dayjs.extend(isBetween);

const couponDiscount = async (couponCode, cartTotal) => {
  if (!couponCode) {
    console.log("Coupon not provided");
    return { success: true, discountPrice: 0 };
  }

  const coupon = await couponModel.findOne({ couponCode, isActive: true });
  if (!coupon || !dayjs().isBetween(coupon.startDate, coupon.endDate)) {
    return { success: false, message: "Invalid or expired coupon code." };
  }

  if (cartTotal < coupon.minCartAmount) {
    return {
      success: false,
      message: `Minimum order should be ${coupon.minCartAmount} to get coupon discount.`,
    };
  }

  let discountPrice = Math.min(
    (cartTotal * coupon.discountPercentage) / 100,
    coupon.maxDiscount
  );
  return {
    success: true,
    discountPrice: discountPrice.toFixed(2),
     coupon,
  };
};

export default couponDiscount;
