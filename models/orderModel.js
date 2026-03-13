import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  email: { type: String, required: true },
  orderValue: { type: Number, required: true },
  items: [{ type: Object }],
  orderDate: { type: Number },
});
const orderModel = mongoose.model("orders", orderSchema);
export default orderModel;