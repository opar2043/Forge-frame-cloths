import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutFrom";


const stripePromise = loadStripe("pk_live_51SZw6APraKsepRQSVes6OXH9KwZWoxlLQernloWQbGrG8Tq3g2vOs8yb2HQ4QPw5qDnNSHCppJjmLWf3BchulJzV00m5ciFip0");
console.log(import.meta.env.STRIPE_API);
const Payment = () => {
  return (
    <div>
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
    </div>
  )
}

export default Payment
