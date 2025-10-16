"use client";
import Link from "next/link";
import { useCart } from "./CartContext";

export default function Header() {
  const { items } = useCart();
  const count = items.reduce((n, p) => n + p.qty, 0);
  return (
    <header className="border-b bg-white">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="font-semibold">E-Commerce Demo</Link>
        <Link href="/cart" className="btn">
          Cart {count > 0 && <span className="ml-2 badge">{count}</span>}
        </Link>
      </div>
    </header>
  );
}
