import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js"
import productRoutes from "./routes/product.js"
import cartRoutes from "./routes/cart.js";
import couponRoutes from "./routes/coupon.js";
import orderRoutes from "./routes/order.js";

import blogRoutes from "./routes/blog.js"
import productCategoryRoutes from "./routes/productCategory.js";
import brandRoutes from "./routes/brand.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(console.log("Database connected Successfully"))
  .catch((err) => console.log(`Database connection failed error : ${err}`));

app.use("/v1/api/user", userRoutes)

app.use("/v1/api/product",productRoutes)
app.use("/v1/api/cart",cartRoutes)
app.use("/v1/api/coupon",couponRoutes)
app.use("/v1/api/order",orderRoutes)

app.use("/v1/api/blog", blogRoutes);

app.use("/v1/api/productCategory", productCategoryRoutes);
app.use("/v1/api/brand", brandRoutes);


// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});


app.listen(process.env.PORT,()=>console.log(`Server is running on port ${process.env.PORT}`))