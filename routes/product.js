import express from "express";
import authCheck from "../middlewares/auth.js";

import createProduct from "../controllers/product/createProduct.js";
import updateProduct from "../controllers/product/updateProduct.js";
import getProducts from "../controllers/product/getProducts.js";
import getProductById from "../controllers/product/getProductById.js";
import productLikeDislike from "../controllers/product/productLikeDislike.js";
import reviewController from "../controllers/product/reviewController.js";

const router = express.Router();

router.post("/", authCheck(["admin", "seller"]), createProduct);
router.patch("/:productid", authCheck(["admin", "seller"]), updateProduct);
router.get("/", getProducts);
router.get(
  "/:productid",
  authCheck(["buyer", "admin", "seller"]),
  getProductById
);

router.post(
  "/review/:productid",
  authCheck(["buyer", "admin", "seller"]),
  reviewController
);

router.post(
  "/:action/:productid",
  authCheck(["buyer", "admin", "seller"]),
  productLikeDislike
);

export default router;
