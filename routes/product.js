import express from "express";
import {
  createProduct,
  updateProduct,
  getProducts,
} from "../controllers/product.js";
import authCheck from "../middlewares/auth.js";


const router = express.Router();

router.post("/",authCheck(["Admin","Seller"]), createProduct);
router.patch("/:productid",authCheck(["Admin","Seller"]), updateProduct);
router.get("/",authCheck(["Buyer","Admin","Seller"]), getProducts);


export default router;
