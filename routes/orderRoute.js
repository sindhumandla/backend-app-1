import { placeOrder,showOrders } from "../controllers/orderController.js";
import express from "express"
const orderRouter = express.Router()

orderRouter.post("/",placeOrder)
orderRouter.get("/:email",showOrders)

export default orderRouter