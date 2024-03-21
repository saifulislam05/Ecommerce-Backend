import userModel from "../../models/user/user.js";

const deleteUser = async (req, res) => {
  console.log(req.user._id);
  // delete user details from db
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.user._id);
    console.log(deletedUser);
    res.json({
      success: true,
      message: "Your account deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting Account -- ", error);
    res.status(500).json({
      success: false,
      message: "Error deleting Account",
    });
  }
};

export default deleteUser;
