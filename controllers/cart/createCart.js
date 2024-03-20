import cartModel from "../../models/cart/cart.js";
import productModel from "../../models/product.js";


const addToCart = async (userId, productId, quantity, color) => {
  const product = await productModel.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const totalprice = product.price * quantity;

  let userCart = await cartModel.findOne({ userId });
  if (userCart) {
    // Update existing cart
    userCart.cartTotal += totalprice;
    userCart.products.push({
      productId,
      quantity,
      color,
      price: product.price,
      totalprice,
    });
    await userCart.save();
  } else {
    // Create new cart
    userCart = await cartModel.create({
      userId,
      products: [
        { productId, quantity, color, price: product.price, totalprice },
      ],
      cartTotal: totalprice,
    });
  }

  return userCart;
};

const createCart = async (req, res) => {
  const { productid } = req.params;
  const { quantity, color } = req.body;

  try {
   const updatedCart= await addToCart(req.user._id, productid, quantity, color);

    console.log("updatedCart:",updatedCart)
    res.json({
      success: true,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    console.error("Error creating/updating cart:", error.message);
    res.status(500).json({
      success: false,
      message: "Error creating cart",
    });
  }
};

export default createCart;
