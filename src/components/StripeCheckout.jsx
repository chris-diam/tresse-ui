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
    <form onSubmit={handleSubmit} className="space-y-6">
     <div className="p-4 border rounded">
       <CardElement 
         options={{
           style: {
             base: {
               fontSize: '16px',
               color: '#a47764',
               '::placeholder': {
                 color: '#e4c7b8',
               },
             },
           },
         }}
       />
     </div>
     
     {error && <div className="text-red-500 text-sm">{error}</div>}
     
     <button
       type="submit"
       disabled={!stripe || processing}
       className="w-full bg-black text-white py-3 uppercase text-sm hover:bg-gray-900 disabled:bg-gray-400"
     >
       {processing ? "Processing..." : "Pay"}
     </button>
   </form>
  );
};

export default StripeCheckout;
