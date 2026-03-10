import {
  getProducts,
  addProductForm,
  addProduct,
  deleteProduct,
  editProductForm,
  saveProduct,
} from "../controllers/productController.js";
import express from "express";
const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/add", addProductForm);
productRouter.post("/add", addProduct);
productRouter.get("/:id/delete", deleteProduct);
productRouter.get("/:id/edit", editProductForm);
productRouter.post("/:id/save", saveProduct);

export default productRouter;
