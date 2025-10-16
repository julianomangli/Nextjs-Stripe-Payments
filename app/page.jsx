"use client";

import { PRODUCTS } from "../lib/products";
import ProductCard from "../components/ProductCard";

export default function Page() {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold">Store</h1>
        <p className="text-gray-600">Add some products and proceed to secure checkout.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
