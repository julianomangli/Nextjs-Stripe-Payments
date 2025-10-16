# Next.js + Tailwind + Stripe Checkout (JS)

A tiny template that demonstrates a product list, cart, and Stripe Checkout integration using the **App Router**.

## Quick start

```bash
# 1) Install deps
npm i

# 2) Copy .env.example -> .env.local and fill in your Stripe TEST keys
cp .env.example .env.local

# 3) Run the dev server
npm run dev
```

Open http://localhost:3000 and try adding products to the cart, then Checkout.

> **Security note**: Your `STRIPE_SECRET_KEY` must only be used on the server (API routes). Never expose it on the client or commit it to Git.

## Environment variables

- `STRIPE_PUBLISHABLE_KEY` — your Stripe publishable test key (client-side).
- `STRIPE_SECRET_KEY` — your Stripe secret test key (server-side only).
- `NEXT_PUBLIC_BASE_URL` — used to construct success/cancel URLs (e.g., `http://localhost:3000`).

## Webhooks (optional)

To test webhooks locally, install the Stripe CLI and run:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Then create events in your Dashboard or via CLI. See the `app/api/webhooks/stripe/route.js` file.
