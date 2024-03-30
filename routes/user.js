import express from "express";

import authCheck from "../middlewares/auth.js";

import register from "../controllers/user/register.js";
import login from "../controllers/user/login.js";
import forgotPassword from "../controllers/user/forgotPassword.js";
import resetPassword from "../controllers/user/resetPassword.js";
import logout from "../controllers/user/logout.js";

import addressController from "../controllers/user/addressController.js";
import wishlistController from "../controllers/user/wishlistController.js";
import getWishlist from "../controllers/user/getWishlist.js";
import deleteUser from "../controllers/user/deleteUser.js";
import getAllUser from "../controllers/user/getAllUser.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", authCheck(["admin", "seller", "buyer"]), forgotPassword);
router.post(
  "/reset-password/:token",
  authCheck(["admin", "seller", "buyer"]),
  resetPassword
);
//localhost:10000/v1/api/user/reset-password/566c133e6889c4f31eb7b4942e957a139c33d82d8f0eb87cd3ce188ebc8920e8

http: router.post("/logout", authCheck(["admin", "seller", "buyer"]), logout);

router.get("/", authCheck(["admin"]), getAllUser);

router.post("/address",authCheck(["admin","seller","buyer"]), addressController);

router.post("/wishlist/:productid",authCheck(["admin","seller","buyer"]), wishlistController);
router.get("/wishlist", authCheck(["admin", "seller", "buyer"]), getWishlist);

router.delete("/delete", authCheck(["admin", "seller", "buyer"]), deleteUser);

export default router;