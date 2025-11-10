import React from "react";
import "./ProductCard.css";

const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function ProductCard({ name, price, inStock }) {
  return (
    <div className="product-card">
      <h2>{name}</h2>
      <p>Price: {formatINR(price)}</p>
      <p className={inStock ? "in-stock" : "out-of-stock"}>
        In Stock: {inStock ? "Yes" : "No"}
      </p>
    </div>
  );
}
