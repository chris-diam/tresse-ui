import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProductGrid from "./components/products/ProductGrid";
import ProductPage from "./components/products/ProductPage";
import { CartProvider } from "./context/CartContext";
import AdminLogin from "./components/admin/AdminLogin";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/admin/AdminDashboard";
import HomePage from "./components/HomePage";
import CheckoutPage from "./components/CheckoutPage";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/products"
              element={
                <Layout>
                  <ProductGrid />
                </Layout>
              }
            />{" "}
            <Route
              path="/product/:id"
              element={
                <Layout>
                  <ProductPage />
                </Layout>
              }
            />
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <Layout>
                  <CheckoutPage />
                </Layout>
              }
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
