import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useCart } from "../context/CartContext";
const StripeCheckout = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, clearCart } = useCart();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      setError(error.message);
    } else {
      clearCart();
      // Redirect to success page
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-black text-white mt-4 py-2 px-4 rounded"
      >
        {processing ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default StripeCheckout;
