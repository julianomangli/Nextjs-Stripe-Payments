# Overview

This is a Next.js e-commerce template demonstrating Stripe Checkout integration. It's a minimal product catalog application that allows users to browse products, add them to a cart, and complete purchases through Stripe's hosted checkout page. The application uses Next.js 14 with the App Router, Tailwind CSS for styling, and server-side API routes for secure payment processing.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Technology Stack**: Next.js 14 App Router with React 18 and Tailwind CSS

The frontend uses Next.js App Router architecture with server and client components. Tailwind CSS provides utility-first styling with custom component classes defined in globals.css (btn, card, badge patterns). The application structure follows Next.js 14 conventions with the `app` directory containing pages and API routes.

**Product Catalog Design**: Products are defined in a static JavaScript module (`lib/products.js`) containing product metadata (id, name, price in cents, image URL, color). This server-side catalog serves as the source of truth for pricing, preventing client-side price manipulation.

## Backend Architecture

**API Routes**: Two Next.js API route handlers manage Stripe operations:

1. **Checkout Session Creation** (`/api/create-checkout-session`): Validates cart items against the server-side product catalog, constructs Stripe line items with server-controlled pricing, and creates a Stripe Checkout session. Returns the checkout URL for client-side redirection.

2. **Webhook Handler** (`/api/webhooks/stripe`): Receives and validates Stripe webhook events using signature verification. Currently logs checkout completion events but can be extended for order fulfillment, email notifications, or database updates.

**Security Model**: The secret Stripe API key is only used in server-side API routes, never exposed to the client. Product prices are validated server-side to prevent tampering. Webhook signatures are verified to ensure events originate from Stripe.

## Payment Processing Flow

**Checkout Integration**: Uses Stripe Checkout (hosted payment page) rather than embedded payment forms. The client sends cart data to the server API, which creates a Stripe session and returns a redirect URL. After payment, Stripe redirects users to success/cancel pages based on the outcome.

**Currency and Payment Methods**: Configured for EUR currency with card payments. Line items are constructed dynamically from cart data with server-validated pricing.

## Configuration Management

**Environment Variables**: 
- `STRIPE_PUBLISHABLE_KEY` - Client-side Stripe key for frontend initialization
- `STRIPE_SECRET_KEY` - Server-side Stripe key for API operations
- `STRIPE_WEBHOOK_SECRET` - Optional webhook signature verification secret
- `NEXT_PUBLIC_BASE_URL` - Base URL for constructing success/cancel redirect URLs

## Styling System

**Tailwind Configuration**: Custom configuration targets the `app` and `components` directories. Global styles define reusable component patterns (buttons, cards, badges) using Tailwind's @apply directive for consistent UI components.

# External Dependencies

## Payment Processing
- **Stripe API** (v16.11.0): Core payment processing service. Handles checkout session creation, payment method collection, and transaction processing. Webhook events provide server-to-server notifications for payment lifecycle events.

## Frontend Framework
- **Next.js** (v14.2.4): React meta-framework providing App Router, server components, API routes, and build optimization
- **React** (v18.2.0): UI library for component-based interfaces

## Styling
- **Tailwind CSS** (v3.4.3): Utility-first CSS framework for responsive design
- **PostCSS** (v8.4.35): CSS processor for Tailwind compilation
- **Autoprefixer** (v10.4.17): Automatic vendor prefix addition for cross-browser compatibility

## Image Hosting
- **Unsplash**: External CDN for product placeholder images (no authentication required)

## Development Tools
- **ESLint** (v8.57.0): Code linting with Next.js-specific rules
- **Stripe CLI**: Optional local development tool for webhook testing

## Webhook Infrastructure (Optional)
When enabled, Stripe webhooks communicate payment events to the application. Local development uses Stripe CLI to forward webhook events to localhost. Production requires a publicly accessible webhook endpoint with signature verification.