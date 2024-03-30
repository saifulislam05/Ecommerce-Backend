import userModel from "../../models/user/user.js";

const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({}, { password: 0, wishlist: 0 });
    res.json({
      success: true,
      message: "user Retrieved Successfully",
      results: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There is something error to Retrieve users",
    });
  }
};

export default getAllUser;
