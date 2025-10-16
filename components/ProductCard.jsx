"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-[4/3]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
      </div>
      <div className="card-body">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-gray-500">{(product.price / 100).toFixed(2)} €</p>
          </div>
          <span className="badge">{product.color}</span>
        </div>
        <button onClick={onAdd} className="btn btn-primary w-full mt-3">
          {added ? "Added ✓" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
