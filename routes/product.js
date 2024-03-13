import express from "express";
import { createProduct } from "../controllers/product.js";
import authCheck from "../middlewares/auth.js";


const router = express.Router();

router.post("/",authCheck(["Admin","Seller"]), createProduct);


export default router;
