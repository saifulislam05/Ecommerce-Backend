import express from "express";
import authCheck from "../middlewares/auth.js";
import createCart from "../controllers/cart/createCart.js";
import getCarts from "../controllers/cart/getCarts.js";

const router = express.Router();

router.post("/", authCheck(["admin", "seller", "buyer"]), createCart);

router.get("/", authCheck(["admin", "seller", "buyer"]), getCarts);

export default router;