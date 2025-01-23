import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "./StripeCheckout";

const stripePromise = loadStripe("your_publishable_key");

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Fetch the client secret from your server
    fetch("http://160.40.54.205:5500/api/create-payment-intent", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <StripeCheckout clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutPage;
