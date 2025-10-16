export default function SuccessPage() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-2xl font-semibold">Payment successful ✅</h1>
      <p>Thanks for your order! This is a demo using Stripe test mode.</p>
      <a className="btn" href="/">Back to store</a>
    </div>
  );
}
