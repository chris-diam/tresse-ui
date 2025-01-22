import { useState } from "react";
// components/admin/AdminDashboard.jsx
  const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
      title: '',
      price: '',
      category: '',
      description: '',
      image: null
    });
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', newProduct.title);
        formData.append('price', newProduct.price);
        formData.append('category', newProduct.category);
        formData.append('description', newProduct.description);
        formData.append('image', newProduct.image); // Make sure field name matches backend expectation
        console.log('FormData contents:');
for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}

        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
          }
      
          // Success handling
        } catch (error) {
          console.error('Upload error:', error);
        }
      };
  
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border rounded"
            onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full p-2 border rounded"
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
          />
          <select
            className="w-full p-2 border rounded"
            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
          >
            <option value="">Select Category</option>
            <option value="clothing">Clothing</option>
            <option value="essentials">Essentials</option>
            <option value="wearable">Wearable</option>
          </select>
          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded"
            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
          />
          <input
            type="file"
            className="w-full p-2 border rounded"
            onChange={(e) => setNewProduct({...newProduct, image: e.target.files[0]})}
          />
          <button type="submit" className="w-full bg-black text-white py-2 rounded">
            Add Product
          </button>
        </form>
      </div>
    );
  };

  export default AdminDashboard