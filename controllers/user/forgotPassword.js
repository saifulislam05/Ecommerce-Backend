import userModel from "../../models/user/user.js";
import sendMail from "../../utils/sendMail.js";

const forgotPassword = async (req, res) => {
  const { email } = req.user;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Assuming createPasswordResetToken() is properly implemented
    const token = await user.createPasswordResetToken();
    await user.save();

    const resetURL = `Hi, Please follow this link to reset your password. This link is valid for 10 minutes. <a href='${process.env.API_BASE_URL}/user/reset-password/${token}'>Click Here</a>.`;

    // Updated to match sendMail's expected parameters
    await sendMail(email, "Forgot Password Link", "Hey User", resetURL);

    // Send response after sending the mail
    res.json({
      success: true,
      message: "Link sent to the given email",
      
    });
  } catch (error) {
    console.error("Error in forgotPassword controller:", error);
    res.status(500).json({
      success: false,
      message: "There was a problem processing your request.",
    });
  }
};

export default forgotPassword;
