// components/cart/Cart.jsx
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

import { Plus, Minus } from "lucide-react";

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const shippingCost = 11.0;
  const total = subtotal + shippingCost;

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
    onClose();
  };

  return (
    <div
      className={`fixed right-0 top-0 h-full w-[400px] border-l-8 border-black bg-[#f0f0e5] text-[#a47764] transform transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
    >
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-sm uppercase">Shopping Cart</h2>
          <button onClick={onClose} className="text-sm uppercase">
            Back
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {cart.map((item, index) => (
            <div key={index} className="flex gap-4 mb-6">
              <img
                src={item.images?.main}
                alt={item.title}
                className="w-24 h-24 object-cover bg-gray-100"
              />

              <div className="flex-1">
                <h3 className="text-sm">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.size}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, -1)}
                    className="px-2 border rounded"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, 1)}
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm">€{item.price}</span>
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="text-sm underline mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm uppercase">Subtotal:</span>
            <span className="text-sm">€{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" checked readOnly />
              <span className="text-sm">Shipping Protection</span>
            </div>
            <span className="text-sm">€{shippingCost.toFixed(2)}</span>
          </div>
          <button 
  onClick={() => navigate('/checkout')}
  className="w-full bg-black text-white py-3 mb-2 uppercase text-sm"
>
  Checkout
</button>
          <button
            onClick={onClose}
            className="w-full bg-black text-white py-3 uppercase text-sm"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
