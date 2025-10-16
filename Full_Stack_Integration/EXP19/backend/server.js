const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); 


const products = [
  { name: "Laptop", price: 800 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 150 },
];


app.get("/api/products", (req, res) => {
  res.json(products);
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
