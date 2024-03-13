import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import userModel from "../models/user.js";


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
const login = async (req, res) => {
  console.log(req.body);

  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not registered with this email",
    });
  }
  const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password) ;
  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: false,
      message: "wrong password",
    });
    }
    
    const expiry = Math.floor(Date.now() / 1000) + 7200 // 2hr from now
    
    const payload = {
        id: user._id,
        firstname:user.firstname,
        lastname: user.lastname,
        role: user.role,
        exp:expiry
    }

    const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY);

  res.json({
    success: true,
      message: "login successed",
      token:token
  });
};

export { register, login };
