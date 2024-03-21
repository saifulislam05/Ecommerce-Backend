import dayjs from "dayjs";
import cartModel from "../../models/cart/cart.js";
import couponDiscount from "./couponDiscount.js";
import orderModel from "../../models/order/order.js";

const createOrder = async (req, res) => {
  const { _id: userId, address: userAddress } = req.user;
  const {
    couponCode,
    modeOfPayment,
    deliveryAddress: deliveryAddressFromBody,
  } = req.body;

  try {
    const userCart = await cartModel.findOne({ userId });
    if (!userCart) {
      return res
        .status(400)
        .json({
          success: false,
          message: "No product in the cart, please add product to cart.",
        });
    }

    const discountResult = await couponDiscount(couponCode, userCart.cartTotal);
    if (!discountResult.success) {
      return res.status(400).json(discountResult);
    }

    const deliveryAddress = deliveryAddressFromBody || userAddress;
    const amountToPay =
      userCart.cartTotal - parseFloat(discountResult.discountPrice);
    const deliveryDate = dayjs().add(7, "day").toDate();

    const orderDetails = {
      userId,
      products: userCart.products,
      actualPrice: userCart.cartTotal,
      amount: amountToPay,
      coupon: discountResult.coupon?._id,
      deliveryAddress,
      orderPlacedAt: new Date(),
      deliveryDate,
      orderStatus: "placed",
      modeOfPayment,
    };

    //create order
    const createdOrder = await orderModel.create(orderDetails);

    // delete userCart after success order
    await cartModel.findByIdAndDelete(userCart._id);
        

    res.json({
      success: true,
      message: "Order created successfully.",
      order: createdOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Error creating order." });
  }
};

export default createOrder;