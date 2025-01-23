import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

// Debug log the environment variable
const API_URL = import.meta.env.VITE_API_URL;
console.log('Environment Variables:', {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  API_URL: API_URL
});

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      // Debug log the fetch attempt
      console.log('Attempting to fetch from:', `${API_URL}/api/products`);
      
      try {
        const response = await fetch(`${API_URL}/api/products`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        // Debug log the response
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers));

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        setProducts(data);
      } catch (err) {
        console.error("Detailed fetch error:", {
          message: err.message,
          stack: err.stack,
          name: err.name
        });
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Debug render state
  console.log('Component state:', { loading, error, productsCount: products.length });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-2">Error: {error}</div>
        <div className="text-gray-600 text-sm">
          Attempted API URL: {API_URL}/api/products
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-6 lg:py-8 ">
      <div className="flex justify-end items-center mb-4 sm:mb-6 pt-12">
        
        <button className="text-sm bg-[#f0f0e5] text-gray-500 px-3 py-1 sm:px-4 sm:py-2 rounded">
          FILTER +
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            {...product}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;