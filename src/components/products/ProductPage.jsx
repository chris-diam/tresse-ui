import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL;

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`${API_URL}/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    console.log("Add to cart clicked", { product, selectedSize });
    if (!selectedSize) {
      console.log("No size selected");
      return;
    }
    addToCart(product, selectedSize);
    console.log("Product added to cart");
  };
  if (!product) return null;

  return (
    <div className="max-w-[2000px] mx-auto px-4 py-40 flex">
      {/* Images Column */}
      <div className="w-full">
        <div className="flex flex-col items-center  ">
          <div className="w-2/4">
            <img
              src={product.images?.main || product.imageUrl}
              alt={product.title}
              className="w-2/3"
            />
            {product.images?.side?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} view ${index + 1}`}
                className="w-2/3 mt-4"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Info Column - Fixed Position */}
      <div className="fixed right-0 top-20 w-1/3 py-20 px-8">
        <div className="uppercase text-xs mb-1">{product.category}</div>
        <h1 className="text-2xl mb-2">{product.title}</h1>
        <div className="text-lg mb-6">€{product.price}</div>

        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full p-2 border mb-4"
        >
          <option value="">Select Size</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">X-Large</option>
        </select>

        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className="w-full bg-black text-white py-3 mb-6"
        >
          ADD TO CART
        </button>

        <p className="text-sm mb-6">{product.description}</p>

        <div className="space-y-4">
          <button className="w-full text-left py-2 border-t flex justify-between items-center">
            <span>DETAILS</span>
            <span>+</span>
          </button>
          <button className="w-full text-left py-2 border-t flex justify-between items-center">
            <span>SHIPPING POLICY</span>
            <span>+</span>
          </button>
          <button className="w-full text-left py-2 border-t flex justify-between items-center">
            <span>SHARE</span>
            <span>+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
