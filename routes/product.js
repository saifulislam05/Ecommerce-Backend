import express from "express";
import { createProduct, updateProduct } from "../controllers/product.js";
import authCheck from "../middlewares/auth.js";


const router = express.Router();

router.post("/",authCheck(["Admin","Seller"]), createProduct);
router.patch("/:productid",authCheck(["Admin","Seller"]), updateProduct);


export default router;
