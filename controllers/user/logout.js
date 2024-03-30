import userModel from "../../models/user/user.js";

const logout = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.user._id, { token: null });
    res.json({
      success: true,
      message: "Successsfully Logged Out",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "There is problem to Log out",
    });
  }
};

export default logout;
