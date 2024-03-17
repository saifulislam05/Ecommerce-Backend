import express from "express";
import authCheck from "../middlewares/auth.js";

import createProduct from "../controllers/product/createProduct.js";
import updateProduct from "../controllers/product/updateProduct.js";
import getProducts from "../controllers/product/getProducts.js";
import getProductById from "../controllers/product/getProductById.js";
import productLikeDislike from "../controllers/product/productLikeDislike.js";
import getProductDetailsById from "../controllers/product/getProductDetailsById.js";
import reviewController from "../controllers/product/reviewController.js";

const router = express.Router();

router.post("/", authCheck(["Admin", "Seller"]), createProduct);
router.patch("/:productid", authCheck(["Admin", "Seller"]), updateProduct);
router.get("/", authCheck(["Buyer", "Admin", "Seller"]), getProducts);
router.get(
  "/:productid",
  authCheck(["Buyer", "Admin", "Seller"]),
  getProductById
);
router.get(
  "/details/:productid",
  authCheck(["Buyer", "Admin", "Seller"]),
  getProductDetailsById
);

router.post(
  "/review/:productid",
  authCheck(["Buyer", "Admin", "Seller"]),
  reviewController
);

router.post(
  "/:action/:productid",
  authCheck(["Buyer", "Admin", "Seller"]),
  productLikeDislike
);

export default router;
