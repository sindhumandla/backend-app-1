import express from "express";
import productModel from "../models/productModel.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;