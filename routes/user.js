import express from "express";

import authCheck from "../middlewares/auth.js";

import register from "../controllers/user/register.js";
import login from "../controllers/user/login.js";
import logout from "../controllers/user/logout.js";
import addressController from "../controllers/user/addressController.js";
import wishlistController from "../controllers/user/wishlistController.js";
import getWishlist from "../controllers/user/getWishlist.js";
import deleteUser from "../controllers/user/deleteUser.js";
import getAllUser from "../controllers/user/getAllUser.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/", authCheck(["admin"]), getAllUser);

router.post("/address",authCheck(["admin","seller","buyer"]), addressController);

router.post("/wishlist/:productid",authCheck(["admin","seller","buyer"]), wishlistController);
router.get("/wishlist", authCheck(["admin", "seller", "buyer"]), getWishlist);

router.delete("/delete", authCheck(["admin", "seller", "buyer"]), deleteUser);

export default router;