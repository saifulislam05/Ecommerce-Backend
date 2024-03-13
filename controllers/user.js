import mongoose from "mongoose";
import userModel from "../models/user.js";

const register = async (req, res) => {
  const newUser = new userModel({
    ...req.body,
  });
  try {
    const newlyRegisteredUser = await newUser.save();
    res.json({
      success: true,
      message: "user registered successfully",
      result: newlyRegisteredUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There is something error",
      error: error,
    });
  }
};
const login = async (req, res) => {
  console.log(req.body);
  
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "user not registered with this email",
        });
    }
    const isPasswordCorrect = req.body.password === user.password;
    if (!isPasswordCorrect) {
        return res.status(401).json({
          success: false,
          message: "wrong password",
          
        });
    }
    res.json({
      success: true,
      message: "login successed",
      result: user,
    });
  
};



export { register,login };
