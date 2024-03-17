import express from "express";
import register from "../controllers/user/register.js";
import login from "../controllers/user/login.js";
import logout from "../controllers/user/logout.js";
import authCheck from "../middlewares/auth.js";
import wishlistController from "../controllers/user/wishlistController.js";
import getWishlist from "../controllers/user/getWishlist.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/wishlist/:productid",authCheck(["admin","seller","buyer"]), wishlistController);
router.get("/wishlist",authCheck(["admin","seller","buyer"]), getWishlist);

export default router;