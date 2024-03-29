import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/user/user.js";
dotenv.config();

const authCheck = (role) => async(req, res, next) => {
  try {
    const tokenFromHeader = req.headers.authorization.split(" ")[1];
      const data = jwt.verify(tokenFromHeader, process.env.TOKEN_SECRET_KEY);
      const payload = jwt.decode(tokenFromHeader);
    const hasPermission = role.includes(payload.role);
    if (!data && !hasPermission) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to do this operation",
      });
    }

      const user = await userModel.findById(payload.id)
      req.user = user;
      next();
      
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Please login",
    });
  }
};

export default authCheck;
