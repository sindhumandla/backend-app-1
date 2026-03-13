import express from "express";
import productModel from "../models/productModel.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;