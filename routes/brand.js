import express from "express";
// Middlewares
import authCheck from "../middlewares/auth.js";

import createBrand from "../controllers/brand/createBrand.js";
import getBrands from "../controllers/brand/getBrands.js";
import getBrandById from "../controllers/brand/getBrandById.js";
import updateBrand from "../controllers/brand/updateBrand.js";
import deleteBrand from "../controllers/brand/deleteBrand.js";


const router = express.Router();

router.post("/", authCheck(["admin"]), createBrand);
router.get("/", getBrands);
router.get("/:brandId", authCheck(["admin"]), getBrandById);
router.patch("/update/:brandId", authCheck(["admin"]), updateBrand);
router.delete("/delete/:brandId", authCheck(["admin"]), deleteBrand);









export default router;
