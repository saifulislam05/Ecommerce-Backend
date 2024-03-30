import dayjs from "dayjs";
import cartModel from "../../models/cart/cart.js";
import couponDiscount from "./couponDiscount.js";
import orderModel from "../../models/order/order.js";

import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

// initialize payment gateway

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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
      return res.status(400).json({
        success: false,
        message: "No product in the cart, please add product to cart.",
      });
    }

    let discountResult;
    let amountToPay = userCart.cartTotal;
    if (couponCode) {
      discountResult = await couponDiscount(couponCode, userCart.cartTotal);

      if (!discountResult.success) {
        return res.status(400).json(discountResult);
      } else {
        amountToPay =
          userCart.cartTotal - parseFloat(discountResult?.discountPrice);
      }
    }

    const deliveryAddress = deliveryAddressFromBody || userAddress;
    console.log("deliveryAddressFromBody---", deliveryAddressFromBody);
    if (!userAddress && !deliveryAddressFromBody) {
      return res.json({
        success: false,
        message: "Plesse provide Address",
      });
    }

    const deliveryDate = dayjs().add(7, "day").toDate();

    const orderDetails = {
      userId,
      products: userCart.products,
      actualPrice: userCart.cartTotal,
      amount: amountToPay,
      coupon: discountResult?.coupon?._id,
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

    let paymentGatewayResponse;

    if (modeOfPayment == "cod") {
      // noting to do or don't craete transaction id or redirect to payment gateway
      return res.json({
        success: true,
        message: "Order placed successfully.",
        orderId: createdOrder._id
      });
    } else {
      // Redirect the user to payment Gateway

      const options = {
        amount: amountToPay * 100,
        currency: "INR",
        receipt: createdOrder._id, // unique order id
        payment_capture: 1,
      };

      console.log("options----", options);

      try {
        paymentGatewayResponse = await razorpay.orders.create(options);

        console.log("paymentGatewayResponse----", paymentGatewayResponse);

        return res.json({
          success: true,
          message: "Order placed successfully.",
          orderId: createdOrder._id,
          paymentInformation: {
            amount: paymentGatewayResponse.amount_due,
            orderId: paymentGatewayResponse.id,
            currency: paymentGatewayResponse.currency,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
res.json({
  success: true,
  message: "Order placed successfully.",
  orderId: createdOrder._id,
  paymentInformation: {
    amount: paymentGatewayResponse.amount_due,
    orderId: paymentGatewayResponse.id,
    currency: paymentGatewayResponse.currency,
  },
});
    
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Error creating order." });
  }
};

export default createOrder;
