export const metadata = {
  title: "Stripe Cart Template",
  description: "Next.js + Tailwind + Stripe Checkout",
};

import "./globals.css";
import Providers from "./providers";
import Header from "../components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="container py-8">{children}</main>
          <footer className="container py-10 text-sm text-gray-500">
            <div className="flex items-center justify-between">
              <p>Demo only. Uses Stripe test mode.</p>
              <a className="underline" href="https://stripe.com/docs/payments/checkout">Stripe Checkout docs</a>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
