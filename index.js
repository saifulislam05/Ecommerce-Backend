import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js"
import productRoutes from "./routes/product.js"

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ecommerce")
    .then(console.log("Database connected Successfully"))
    .catch((err)=>console.log(`Database connection failed error : ${err}` ));

app.use("/v1/api/user",userRoutes)
app.use("/v1/api/product",productRoutes)
const PORT = 10000;


app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))