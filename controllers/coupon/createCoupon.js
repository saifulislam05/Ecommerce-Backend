import couponModel from "../../models/coupon.js";

//     "couponCode":"GK10",
//     "discountPercentage":10,
//     "maxDiscount":150,
//     "minCartAmount":1100,
//     "startDate":"2024-03-21T09:10",
//     "endDate":"2024-03-21T09:50"

const createCoupon = async (req, res) => {
  try {
    const couponObject = {
      ...req.body,
      createdBy:req.user._id
    }
    const createdResult = await couponModel.create(couponObject);
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
