// context/CartContext.jsx
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const clearCart = () => setCart([]);


  const addToCart = (product, size) => {
    // Create unique ID for cart item combining product ID and size
    const cartItemId = `${product._id}-${size}`;

    setCart((prev) => {
      // Check if item with same ID and size exists
      const exists = prev.some(
        (item) => `${item._id}-${item.size}` === cartItemId
      );

      if (!exists) {
        // Add new item if doesn't exist
        return [...prev, { ...product, size, cartItemId }];
      }
      return prev;
    });
  };

  const updateQuantity = (cartItemId, change) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) }
          : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
