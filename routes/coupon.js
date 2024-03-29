import express from "express";

import authCheck from "../middlewares/auth.js";
import couponActionAuth from "../middlewares/couponActionAuth.js";

import createCoupon from "../controllers/coupon/createCoupon.js";
import getCouponByCode from "../controllers/coupon/getCouponByCode.js";

import updateCoupon from "../controllers/coupon/updateCoupon.js";
import deleteCoupon from "../controllers/coupon/deleteCoupon.js";
import getCoupons from "../controllers/coupon/getCoupons.js";

const router = express.Router();

router.post("/", authCheck(["admin", "seller", "buyer"]), createCoupon);
router.get("/", authCheck(["admin"]), getCoupons);

router.patch(
  "/update/:couponId",
  authCheck(["admin", "seller"]),
  couponActionAuth,
  updateCoupon
);

router.delete(
  "/delete/:couponId",
  authCheck(["admin", "seller"]),
  couponActionAuth,
  deleteCoupon
);
router.get(
  "/:couponCode",
  authCheck(["admin", "seller", "buyer"]),
  getCouponByCode
);

export default router;
