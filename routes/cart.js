import express from "express";
import authCheck from "../middlewares/auth.js";
import createCart from "../controllers/cart/createCart.js";

const router = express.Router();

router.post("/:productid", authCheck(["admin", "seller", "buyer"]), createCart)

export default router;