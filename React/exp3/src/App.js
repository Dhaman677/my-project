import React from "react";
import ProductCard from "./ProductCard";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <ProductCard name="iPhone 15" price={79999} inStock />
      <ProductCard name="Samsung Galaxy S23" price={69999} inStock={false} />
      <ProductCard name="OnePlus 12" price={59999} inStock />
    </div>
  );
}
