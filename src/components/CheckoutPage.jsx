import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "./StripeCheckout";
import { useCart } from "../context/CartContext";

const stripePromise = loadStripe("pk_test_51QkQtc04gROXO8AyRKr3HZzVqWxqv1GQhsLfCNw7j7ygrGhNXNr3v7EZTp2l5V2z6Uu6FGtBuZhJIjIxM5GTMK500z0EiP2ly");

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { cart } = useCart();
  const orderTotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);


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
    <div className="content-wrapper min-h-screen bg-[#f0f0e5]">
     <div className="max-w-4xl mx-auto py-12 px-6">
       <div className="flex justify-between mb-8">
         <h1 className="text-3xl font-cormorant text-[#a47764]">Checkout</h1>
         <div className="text-[#a47764]">Total: €{orderTotal.toFixed(2)}</div>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Contact & Delivery */}
         <div className="space-y-6">
           <div className="bg-white p-6 rounded-lg shadow">
             <h2 className="text-xl mb-4">Contact</h2>
             <input 
               type="email"
               placeholder="Email"
               className="w-full p-2 border rounded mb-2"
             />
             <label className="flex items-center">
               <input type="checkbox" className="mr-2" />
               <span className="text-sm">Email me with news and offers</span>
             </label>
           </div>

           <div className="bg-white p-6 rounded-lg shadow">
             <h2 className="text-xl mb-4">Delivery</h2>
             <form className="space-y-4">
               <select className="w-full p-2 border rounded">
                 <option>Greece</option>
               </select>
               <input placeholder="First name" className="w-full p-2 border rounded" />
               <input placeholder="Last name" className="w-full p-2 border rounded" />
               <input placeholder="Address" className="w-full p-2 border rounded" />
               <input placeholder="Postal code" className="w-full p-2 border rounded" />
               <input placeholder="City" className="w-full p-2 border rounded" />
               <input placeholder="Phone" className="w-full p-2 border rounded" />
             </form>
           </div>
         </div>

         {/* Payment */}
         <div className="bg-white p-6 rounded-lg shadow">
           <h2 className="text-xl mb-4">Payment</h2>
           {clientSecret && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl mb-4">Payment</h2>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripeCheckout clientSecret={clientSecret} />
            </Elements>
          </div>
        )}
           
           <div className="mt-6 pt-6 border-t">
             <label className="flex items-center mb-4">
               <input type="checkbox" className="mr-2" />
               <span className="text-sm">Save my information for faster checkout</span>
             </label>
             <button className="w-full bg-black text-white py-3 text-sm uppercase">
               Pay now
             </button>
           </div>
         </div>
       </div>
     </div>
   </div>
  );
};

export default CheckoutPage;
