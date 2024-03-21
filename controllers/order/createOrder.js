import cartModel from "../../models/cart/cart.js";

const createOrder = async (req, res) => {

    const userCart = await cartModel.findOne({ userId: req.user._id })
    
    console.log("userCart-------", userCart);
  
    if (!userCart) {// no product in the user cart
       res.status(404).json({
         success: false,
         message: "no product added in the cart",
       }); 
    } else {
        // product present in the userCart
    }

      res.json({
        success: true,
        message:'create order api'
    })
}

export default createOrder;