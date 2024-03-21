import express from "express";
import authCheck from "../middlewares/auth.js";
import createCoupon from "../controllers/coupon/createCoupon.js";
import getCouponByCode from "../controllers/coupon/getCouponByCode.js";

const router=express.Router()


router.post("/", authCheck(["admin", "seller", "buyer"]), createCoupon);
router.get("/", authCheck(["admin", "seller", "buyer"]), getCouponByCode);


export default router;
