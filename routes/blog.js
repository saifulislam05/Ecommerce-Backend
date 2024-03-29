import express from "express";
// Middlewares
import authCheck from "../middlewares/auth.js";
import blogActionAuth from "../middlewares/blogActionAuth.js";

// Contrllers
import createBlog from "../controllers/blog/createBlog.js";
import getBlogs from "../controllers/blog/getBlogs.js";
import getBlogById from "../controllers/blog/getBlogById.js";
import blogLikeDislike from "../controllers/blog/blogLikeDislike.js";
import updateBlog from "../controllers/blog/updateBlog.js";
import deleteBlog from "../controllers/blog/deleteBlog.js";

const router = express.Router();

router.post("/", authCheck(["admin", "seller"]), createBlog);
router.get("/", getBlogs);
router.get(
  "/:blogid",
  authCheck(["buyer", "admin", "seller"]),
  getBlogById
);

router.post(
  "/:action/:blogid",
  authCheck(["buyer", "admin", "seller"]),
  blogLikeDislike
);


router.patch(
  "/update/:blogid",
  authCheck(["admin", "seller"]),
  blogActionAuth,
  updateBlog
);

router.delete(
  "/delete/:blogid",
  authCheck(["admin", "seller"]),
  blogActionAuth,
  deleteBlog
);




export default router;
