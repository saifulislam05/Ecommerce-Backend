import express from "express";
// Middlewares
import authCheck from "../middlewares/auth.js";

import createProductCategory from "../controllers/productCategory/createProductCategory.js";
import getProductCategories from "../controllers/productCategory/getProductCategories.js";
import getProductCategoryById from "../controllers/productCategory/getProductCategoryById.js";
import updateProductCategory from "../controllers/productCategory/updateProductCategory.js";
import deleteProductCategory from "../controllers/productCategory/deleteProductCategory.js";


const router = express.Router();

router.post("/", authCheck(["admin"]), createProductCategory);
router.get("/", getProductCategories);
router.get("/:productCategoryId", authCheck(["admin"]), getProductCategoryById);
router.patch("/update/:productCategoryId", authCheck(["admin"]), updateProductCategory);
router.delete("/delete/:productCategoryId", authCheck(["admin"]), deleteProductCategory);









export default router;
