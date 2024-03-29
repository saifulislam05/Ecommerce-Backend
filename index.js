import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js"
import productRoutes from "./routes/product.js"
import cartRoutes from "./routes/cart.js";
import couponRoutes from "./routes/coupon.js";
import orderRoutes from "./routes/order.js";

import blogRoutes from "./routes/blog.js"

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ecommerce")
    .then(console.log("Database connected Successfully"))
    .catch((err)=>console.log(`Database connection failed error : ${err}` ));

app.use("/v1/api/user", userRoutes)

app.use("/v1/api/product",productRoutes)
app.use("/v1/api/cart",cartRoutes)
app.use("/v1/api/coupon",couponRoutes)
app.use("/v1/api/order",orderRoutes)

app.use("/v1/api/blog", blogRoutes);

const PORT = 10000;
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))