"use client";

import Link from "next/link";
import { useCart } from "../../components/CartContext";

function CartTable() {
  const { items, inc, dec, remove, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center space-y-4">
        <p>Your cart is empty.</p>
        <Link className="btn" href="/">Go shopping</Link>
      </div>
    );
  }

  const checkout = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: items.map(({ id, qty }) => ({ id, qty })) }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.error || "Failed to start checkout");
      return;
    }
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("No checkout URL received.");
    }
  };

  return (
    <div className="space-y-6">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500">
            <th className="py-2">Product</th>
            <th className="py-2">Qty</th>
            <th className="py-2">Price</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="py-3">{p.name}</td>
              <td className="py-3">
                <div className="inline-flex items-center gap-2">
                  <button className="btn" onClick={() => dec(p.id)}>-</button>
                  <span>{p.qty}</span>
                  <button className="btn" onClick={() => inc(p.id)}>+</button>
                </div>
              </td>
              <td className="py-3">{((p.price * p.qty) / 100).toFixed(2)} €</td>
              <td className="py-3 text-right">
                <button className="btn" onClick={() => remove(p.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between">
        <p className="text-lg">Total: <strong>{(total / 100).toFixed(2)} €</strong></p>
        <button className="btn btn-primary" onClick={checkout}>Checkout</button>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      <CartTable />
    </>
  );
}
