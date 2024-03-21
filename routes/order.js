import  express  from "express";
import authCheck from "../middlewares/auth.js";
import createOrder from "../controllers/order/createOrder.js";

const router = express.Router()

router.post("/", authCheck(["admin", "seller", "buyer"]), createOrder);
export default router;