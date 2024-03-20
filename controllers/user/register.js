import bcrypt from "bcrypt";
import userModel from "../../models/user/user.js";

const register = async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const newUser = new userModel({
    ...req.body,
    password: hash,
  });
  try {
    // const newlyRegisteredUser = await newUser.save();
    await newUser.save();
    res.json({
      success: true,
      message: "user registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There is something error",
      error: error,
    });
  }
};

export default register;
