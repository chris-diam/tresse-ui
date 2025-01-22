import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProductGrid from "./components/products/ProductGrid";
import ProductPage from "./components/products/ProductPage";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductGrid />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;