import Stripe from "stripe";
import { NextResponse } from "next/server";
import { PRODUCTS } from "../../../lib/products";

const catalog = new Map(PRODUCTS.map(p => [p.id, p]));

export async function POST(req) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "STRIPE_SECRET_KEY is not set" }, { status: 500 });
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const body = await req.json().catch(() => ({}));
    const requested = Array.isArray(body.items) ? body.items : [];

    if (requested.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Validate against server-side catalog to prevent price tampering
    const line_items = [];
    for (const { id, qty } of requested) {
      const product = catalog.get(id);
      if (!product) {
        return NextResponse.json({ error: `Unknown product: ${id}` }, { status: 400 });
      }
      const quantity = Math.max(1, parseInt(qty || 1, 10));
      line_items.push({
        price_data: {
          currency: "eur",
          product_data: { name: product.name },
          unit_amount: product.price
        },
        quantity
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? err.message || "Failed to create checkout session"
      : "Failed to create checkout session";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
