# E-Commerce Store Template 🛍️

A modern, production-ready e-commerce template built with Next.js 14, Tailwind CSS, and Stripe Checkout integration. Features a sleek product catalog, shopping cart with localStorage persistence, and secure server-side payment processing.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-Checkout-635bff?style=for-the-badge&logo=stripe&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🌟 Features

### 💳 Payment Processing
- **Stripe Checkout Integration** - Secure, hosted payment page with card processing
- **Server-Side Price Validation** - Prevent client-side price tampering
- **Webhook Support** - Real-time payment event notifications
- **Test Mode Ready** - Built-in support for Stripe test keys

### 🛒 Shopping Experience
- **Product Catalog** - Clean, responsive grid layout with product cards
- **Shopping Cart** - Full cart management with quantity controls
- **Persistent Cart** - localStorage integration maintains cart across sessions
- **Real-time Updates** - Instant cart badge updates and item management

### 🎨 Design & UX
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI Components** - Custom card, button, and badge styles
- **Fast Performance** - Optimized Next.js App Router architecture
- **Smooth Interactions** - Loading states and visual feedback

### 🔒 Security & Best Practices
- **Environment Variable Protection** - Secrets never exposed to client
- **Server-Side API Routes** - Secure checkout session creation
- **Webhook Signature Verification** - Validated Stripe event handling
- **Production-Ready Error Handling** - Generic messages in production, detailed in development

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Stripe account (test mode)
- Basic understanding of Next.js and React

### 1. Stripe Account Setup
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Sign up or log in to your account
3. Navigate to **Developers** → **API Keys**
4. Copy your **Publishable key** (starts with `pk_test_`)
5. Copy your **Secret key** (starts with `sk_test_`)

### 2. Environment Configuration
Set up the following environment variables in Replit Secrets or `.env.local`:

```env
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_BASE_URL=https://your-app-url.replit.dev
```

**For Webhooks (Optional):**
```env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 3. Installation & Deployment
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### 4. Accessing Your Store
- **Development**: http://localhost:5000
- **Production**: Your deployed Replit URL

## 📋 Feature Reference

### Product Management

| Feature | Description | Location | Customization |
|---------|-------------|----------|---------------|
| Product Catalog | Static product definitions | `lib/products.js` | Add/edit products with id, name, price, image, color |
| Product Cards | Reusable product display | `components/ProductCard.jsx` | Customize layout and styling |
| Product Images | External image hosting | Unsplash CDN | Replace with your own image URLs |
| Pricing | Server-side price validation | `lib/products.js` | Prices stored in cents (1900 = €19.00) |

### Cart Functionality

| Feature | Description | Implementation | Notes |
|---------|-------------|----------------|-------|
| Add to Cart | One-click add with feedback | `components/ProductCard.jsx` | Shows "Added ✓" confirmation |
| Cart Context | Global cart state | `components/CartContext.jsx` | React Context API |
| LocalStorage | Persistent cart storage | Auto-saves on changes | Key: `demo_cart_v1` |
| Quantity Control | Increment/decrement items | `app/cart/page.jsx` | Minimum quantity: 1 |
| Remove Items | Delete from cart | Single click removal | Instant update |
| Cart Badge | Item count display | `components/Header.jsx` | Shows total quantity |

### Checkout Process

| Step | Description | Endpoint | Security |
|------|-------------|----------|----------|
| Session Creation | Generate Stripe checkout URL | `/api/create-checkout-session` | Server-side price validation |
| Payment Page | Stripe-hosted checkout | Stripe Checkout | PCI compliant |
| Success Redirect | Payment confirmation | `/success` | Custom success page |
| Cancel Redirect | Checkout cancelled | `/cancel` | Return to shopping |

### API Routes

| Route | Method | Purpose | Authentication |
|-------|--------|---------|---------------|
| `/api/create-checkout-session` | POST | Create Stripe checkout session | Stripe Secret Key |
| `/api/webhooks/stripe` | POST | Handle Stripe events | Webhook signature verification |

## 🛠️ Technical Architecture

### Project Structure
```
ecommerce-store/
├── app/                    # Next.js App Router
│   ├── api/               # Server-side API routes
│   │   ├── create-checkout-session/
│   │   └── webhooks/stripe/
│   ├── cart/              # Shopping cart page
│   ├── success/           # Payment success page
│   ├── cancel/            # Payment cancelled page
│   ├── layout.jsx         # Root layout with providers
│   ├── page.jsx           # Product catalog page
│   ├── providers.jsx      # Context providers
│   └── globals.css        # Global styles & Tailwind
├── components/            # React components
│   ├── CartContext.jsx    # Cart state management
│   ├── Header.jsx         # Navigation header
│   └── ProductCard.jsx    # Product display card
├── lib/                   # Shared utilities
│   └── products.js        # Product data catalog
└── package.json           # Dependencies
```

### Core Technologies
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with Server Components
- **Stripe API v16** - Payment processing
- **Tailwind CSS 3** - Utility-first styling
- **LocalStorage API** - Client-side cart persistence

### Advanced Features

#### Server-Side Security
- Price validation against server catalog
- Environment variable isolation
- Webhook signature verification
- Production error message sanitization

#### Performance Optimizations
- Server Components for faster page loads
- Static product catalog (no database queries)
- Efficient cart state management
- Optimized image loading from CDN

#### Error Handling
- Graceful API error responses
- User-friendly error messages
- Development vs. production error details
- Console logging for debugging

## 🔧 Configuration Options

### Product Customization
Edit `lib/products.js` to customize your catalog:

```javascript
export const PRODUCTS = [
  {
    id: "unique-product-id",        // Unique identifier
    name: "Product Name",             // Display name
    price: 2999,                      // Price in cents (€29.99)
    image: "https://...",             // Image URL
    color: "Color/Category"           // Product attribute
  }
];
```

### Stripe Configuration
- **Currency**: EUR (change in `app/api/create-checkout-session/route.js`)
- **Payment Methods**: Card (configurable in Stripe session)
- **Mode**: Payment (one-time payment, not subscription)

### Styling Customization
Global styles in `app/globals.css`:
```css
.btn { /* Button styles */ }
.btn-primary { /* Primary button variant */ }
.card { /* Card container */ }
.badge { /* Badge component */ }
```

## 📊 Usage Examples

### Adding New Products
1. Open `lib/products.js`
2. Add new product object to array:
```javascript
{
  id: "hoodie-blue",
  name: "Blue Hoodie",
  price: 4500,
  image: "https://images.unsplash.com/...",
  color: "Blue"
}
```
3. Server automatically validates new products

### Customizing Success Page
Edit `app/success/page.jsx`:
```javascript
export default function SuccessPage() {
  return (
    <div className="text-center space-y-4">
      <h1>Thank you for your purchase! 🎉</h1>
      <p>Your order confirmation has been sent.</p>
      <a className="btn btn-primary" href="/">Continue Shopping</a>
    </div>
  );
}
```

### Webhook Event Handling
Extend `app/api/webhooks/stripe/route.js`:
```javascript
if (event.type === "checkout.session.completed") {
  const session = event.data.object;
  // Add your logic:
  // - Send confirmation email
  // - Update database
  // - Trigger fulfillment
}
```

## 🔍 Troubleshooting

### Common Issues

#### Checkout Returns 500 Error
1. Verify `STRIPE_SECRET_KEY` is set in Replit Secrets
2. Check console logs for detailed error (development mode)
3. Ensure cart is not empty
4. Validate product IDs match server catalog

#### Cart Not Persisting
1. Check browser localStorage is enabled
2. Clear cache and cookies
3. Verify localStorage key: `demo_cart_v1`
4. Check for browser console errors

#### Images Not Loading
1. Verify image URLs are accessible
2. Check network tab for CORS errors
3. Use CDN-hosted images (Unsplash, Cloudinary, etc.)
4. Ensure image URLs use HTTPS

#### Deployment Failures
1. Verify deployment target is `autoscale`
2. Remove duplicate port configurations
3. Ensure `npm run build` succeeds locally
4. Check all environment variables are set

### Debug Steps
```bash
# Check environment variables
npm run dev

# View build output
npm run build

# Test Stripe connection
# Check API logs in Stripe Dashboard

# Validate webhook signature
stripe listen --forward-to localhost:5000/api/webhooks/stripe
```

### Log Analysis
Development logs show:
- **Checkout errors**: Full Stripe error messages
- **Webhook events**: Event type and session ID
- **Cart operations**: Add/remove/update actions

Production logs show:
- **Generic error messages**: Security-safe responses
- **Server errors**: Console logs only (not sent to client)

## 🔒 Security Best Practices

### Environment Variables
- ✅ Never commit `.env.local` to Git
- ✅ Use Replit Secrets for production
- ✅ Rotate API keys periodically
- ✅ Use separate test/production keys

### Stripe Security
- ✅ Secret key only on server
- ✅ Publishable key safe for client
- ✅ Webhook signature verification enabled
- ✅ Price validation server-side

### Payment Best Practices
- ✅ Use Stripe test mode during development
- ✅ Never store card information
- ✅ Let Stripe handle PCI compliance
- ✅ Implement proper error handling

### Code Security
- ✅ Sanitize user inputs
- ✅ Validate all API requests
- ✅ Use HTTPS in production
- ✅ Generic error messages to users

## 📈 Performance Monitoring

### Key Metrics
- **Page Load Time**: First Contentful Paint
- **Cart Operations**: Add/remove response time
- **Checkout Flow**: Session creation speed
- **Image Loading**: CDN performance

### Optimization Tips
- Use Next.js Image component for optimization
- Implement lazy loading for product images
- Enable Stripe performance monitoring
- Monitor webhook response times

## 🚢 Deployment Guide

### Deploying to Replit (Autoscale)
1. Ensure all environment variables are set in Replit Secrets
2. Set deployment target to `autoscale`
3. Configure build command: `npm run build`
4. Configure run command: `npm run start`
5. Click "Deploy" button in Replit

### Post-Deployment Checklist
- ✅ Test product catalog loads
- ✅ Verify cart functionality
- ✅ Complete test checkout with Stripe test card
- ✅ Confirm webhook events (if enabled)
- ✅ Check all environment variables

### Stripe Webhook Setup (Production)
1. Get your deployed URL: `https://your-app.replit.dev`
2. Go to Stripe Dashboard → Developers → Webhooks
3. Add endpoint: `https://your-app.replit.dev/api/webhooks/stripe`
4. Select events: `checkout.session.completed`
5. Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## 🧪 Testing

### Test Cards (Stripe Test Mode)
```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3155
```

**Card Details:**
- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits

### Testing Workflow
1. Add products to cart
2. Proceed to checkout
3. Use test card: `4242 4242 4242 4242`
4. Complete payment
5. Verify redirect to success page
6. Check Stripe Dashboard for payment

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run development server: `npm run dev`
5. Make changes and test

### Code Standards
- Follow existing code style
- Use meaningful commit messages
- Test all checkout flows
- Update documentation for new features

## 📄 License & Credits

### Dependencies
- [Next.js](https://nextjs.org/) - React framework
- [Stripe](https://stripe.com/) - Payment processing
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [React](https://react.dev/) - UI library

### External Services
- **Stripe Checkout** - PCI-compliant payment processing
- **Unsplash** - Product image CDN
- **Replit** - Hosting and deployment platform

## 🆘 Support

### Getting Help
1. Check this README for common solutions
2. Review Stripe documentation: [Stripe Checkout Docs](https://stripe.com/docs/payments/checkout)
3. Check Next.js App Router docs: [Next.js Docs](https://nextjs.org/docs)
4. Verify all environment variables are set correctly

### Stripe Test Mode Resources
- [Test Cards](https://stripe.com/docs/testing)
- [Webhook Testing](https://stripe.com/docs/webhooks/test)
- [Checkout Session API](https://stripe.com/docs/api/checkout/sessions)

### Error Reporting
When reporting issues, include:
- Full error message from browser console
- Server logs (if accessible)
- Steps to reproduce
- Environment (development/production)
- Stripe test mode vs. live mode

## 🎯 Roadmap

### Potential Enhancements
- [ ] Add product database integration
- [ ] Implement user authentication
- [ ] Add order history
- [ ] Email confirmation system
- [ ] Inventory management
- [ ] Multiple currency support
- [ ] Discount code functionality
- [ ] Product search and filtering