"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const KEY = "demo_cart_v1";
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = (product) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx].qty += 1;
        return copy;
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, color: product.color, qty: 1 }];
    });
  };

  const remove = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const inc = (id) => setItems((prev) => prev.map(p => p.id === id ? { ...p, qty: p.qty + 1 } : p));
  const dec = (id) => setItems((prev) => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p));
  const clear = () => setItems([]);

  const total = useMemo(() => items.reduce((sum, p) => sum + p.price * p.qty, 0), [items]);

  const value = { items, add, remove, inc, dec, clear, total };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
