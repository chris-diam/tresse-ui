import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProductGrid from "./components/products/ProductGrid";
import ProductPage from "./components/products/ProductPage";
import { CartProvider } from './context/CartContext';
import AdminLogin from './components/admin/AdminLogin';
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from './components/ProtectedRoute'
import AdminDashboard from "./components/admin/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout><ProductGrid /></Layout>} />
            <Route path="/product/:id" element={<Layout><ProductPage /></Layout>} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;