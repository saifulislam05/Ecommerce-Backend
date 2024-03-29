import express from "express";
// Middlewares
import authCheck from "../middlewares/auth.js";
import productActionAuth from "../middlewares/productActionAuth.js";

// Contrllers
import createProduct from "../controllers/product/createProduct.js";
import getProducts from "../controllers/product/getProducts.js";
import getProductById from "../controllers/product/getProductById.js";
import productLikeDislike from "../controllers/product/productLikeDislike.js";
import reviewController from "../controllers/product/reviewController.js";
import updateProduct from "../controllers/product/updateProduct.js";
import deleteProduct from "../controllers/product/deleteProduct.js";

const router = express.Router();

router.post("/", authCheck(["admin", "seller"]), createProduct);
router.get("/", getProducts);
router.get(
  "/:productid",
  authCheck(["buyer", "admin", "seller"]),
  getProductById
);

router.post(
  "/:action/:productid",
  authCheck(["buyer", "admin", "seller"]),
  productLikeDislike
);
router.post(
  "/review/:productid",
  authCheck(["buyer", "admin", "seller"]),
  reviewController
);


router.patch(
  "/update/:productid",
  authCheck(["admin", "seller"]),
  productActionAuth,
  updateProduct
);

router.delete(
  "/delete/:productid",
  authCheck(["admin", "seller"]),
  productActionAuth,
  deleteProduct
);




export default router;
