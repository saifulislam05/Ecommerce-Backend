import userModel from "../../models/user.js";

const getWishlist = async (req, res) => {
  try {

    const userWithWishlist = await userModel.findOne(
      { _id: req.user._id },
      { wishlist: 1 }
    ).populate({ path:"wishlist",select:"title description price stock"});

    if (!userWithWishlist) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Extract the wishlist from the query result
    const { wishlist } = userWithWishlist;

    res.json({
      success: true,
      message: "Wishlist fetched successfully",
      wishlist,
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist. Please try again later.",
    });
  }
};

export default getWishlist;
