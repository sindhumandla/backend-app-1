import orderModel from "../models/orderModel.js";

const placeOrder = async (req, res) => {
  const response = await orderModel.create(req.body);
  res.json(response);
};

const showOrders = async (req, res) => {
  try {
    const email = req.params.email;
    const response = await orderModel.find({ email });
    res.status(200).json(response);
  } catch (err) {
    res.status(401).json({ error: "Something went wrong" });
  }
};

export { placeOrder, showOrders };