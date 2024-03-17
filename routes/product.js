import express from "express";

import createProduct from "../controllers/product/createProduct.js"
import updateProduct from "../controllers/product/updateProduct.js"
import getProducts from "../controllers/product/getProducts.js"
import getProductById from "../controllers/product/getProductById.js"
import productLikeDislike from "../controllers/product/productLikeDislike.js"

import authCheck from "../middlewares/auth.js";


const router = express.Router();

router.post("/",authCheck(["Admin","Seller"]), createProduct);
router.patch("/:productid",authCheck(["Admin","Seller"]), updateProduct);
router.get("/",authCheck(["Buyer","Admin","Seller"]), getProducts);
router.get("/:productid", authCheck(["Buyer", "Admin", "Seller"]), getProductById);

router.post("/:action/:productid", authCheck(["Buyer", "Admin", "Seller"]), productLikeDislike);



export default router;
