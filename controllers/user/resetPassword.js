import userModel from "../../models/user/user.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await userModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Token Expired, please try again",
      });
    }
    const hash = bcrypt.hashSync(password, 10);

    await userModel.findByIdAndUpdate(user._id, {
      password: hash,
      passwordResetToken: null,
      passwordResetExpires: null,
    });

    res.json({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.error("Error in resetPassword controller:", error);
    res.status(500).json({
      success: false,
      message: "There was a problem reseting password.",
    });
  }
};

export default resetPassword;
