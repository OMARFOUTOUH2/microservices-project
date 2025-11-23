import express from "express";
import Product from "./models/product.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get single product
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Product not found" });
});

// Create product
router.post("/", async (req, res) => {
  const { name, description, price, inStock } = req.body;
  const product = new Product({ name, description, price, inStock });
  await product.save();
  res.status(201).json(product);
});

// Update product
router.put("/:id", async (req, res) => {
  const { name, description, price, inStock } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.inStock = inStock !== undefined ? inStock : product.inStock;
    await product.save();
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

export default router;
