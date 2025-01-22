import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return null;

  return (
    <div className="max-w-[2000px] mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      <div className="md:w-2/3">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className="w-full aspect-square object-cover"
        />
      </div>
      <div className="md:w-1/3 space-y-4">
        <div className="uppercase text-sm">{product.category}</div>
        <h1 className="text-2xl font-normal">{product.title}</h1>
        <div className="text-lg">€{product.price}</div>
        
        <div className="space-y-2">
          <label className="block text-sm">Select Size</label>
          <select 
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full p-2 border"
          >
            <option value="">Select Size</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">X-Large</option>
          </select>
        </div>

        <button 
          className="w-full bg-gray-900 text-white py-3 hover:bg-gray-800 transition-colors"
        >
          ADD TO CART
        </button>

        <div className="space-y-4 pt-4">
          <div>
            <h3 className="text-sm font-medium">DETAILS</h3>
            <p className="text-sm mt-2">{product.description}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium">SHIPPING POLICY</h3>
            <p className="text-sm mt-2">Free shipping on orders over €50</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;