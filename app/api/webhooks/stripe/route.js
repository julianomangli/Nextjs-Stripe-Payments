import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("STRIPE_SECRET_KEY is not set");
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

    // Handle basic events
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Checkout complete:", session.id);
    }

    return new NextResponse(null, { status: 200 });
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
}
