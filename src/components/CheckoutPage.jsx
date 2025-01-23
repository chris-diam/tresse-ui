import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "./StripeCheckout";
import { useCart } from "../context/CartContext";

const stripePromise = loadStripe("pk_test_51QkQtc04gROXO8AyRKr3HZzVqWxqv1GQhsLfCNw7j7ygrGhNXNr3v7EZTp2l5V2z6Uu6FGtBuZhJIjIxM5GTMK500z0EiP2ly");

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { cart } = useCart();

  useEffect(() => {
    const amount = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) * 100;

    fetch(`${import.meta.env.VITE_API_URL}/api/products/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [cart]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 min-h-screen bg-[#f0f0e5]">
     <h2 className="text-3xl font-cormorant mb-8 text-[#a47764]">Checkout</h2>
     {clientSecret && (
       <Elements stripe={stripePromise} options={{ clientSecret }}>
         <div className="bg-white p-6 rounded shadow">
           <StripeCheckout clientSecret={clientSecret} />
         </div>
       </Elements>
     )}
   </div>
  );
};

export default CheckoutPage;
