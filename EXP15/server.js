const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/ecommerceDB");


const variantSchema = new mongoose.Schema({
  color: String,
  size: String,
  stock: Number,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  variants: [variantSchema],
});

const Product = mongoose.model("Product", productSchema);




app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});


app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});


app.get("/products/category/:category", async (req, res) => {
  const products = await Product.find({ category: req.params.category });
  res.json(products);
});


app.get("/products/variants", async (req, res) => {
  const products = await Product.find({}, { name: 1, "variants.color": 1, "variants.stock": 1 });
  res.json(products);
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
