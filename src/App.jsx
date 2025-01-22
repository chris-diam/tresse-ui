import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProductGrid from "./components/products/ProductGrid";
import ProductPage from "./components/products/ProductPage";
import { CartProvider } from './context/CartContext';


const App = () => {
  return (
    <BrowserRouter>
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductGrid />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </Layout>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;