import { useState } from "react";

const AdminDashboard = () => {
 const [newProduct, setNewProduct] = useState({
   title: '',
   price: '',
   category: '',
   description: '',
   mainImage: null,
   sideImages: []
 });

 const renderImagePreviews = () => (
  <div className="grid grid-cols-3 gap-2 mt-2">
    {newProduct.sideImages.map((file, index) => (
      <div key={index} className="relative">
        <img 
          src={URL.createObjectURL(file)} 
          alt={`Preview ${index + 1}`}
          className="h-32 w-full object-cover"
        />
        <button
          onClick={() => {
            const newFiles = newProduct.sideImages.filter((_, i) => i !== index);
            setNewProduct({...newProduct, sideImages: newFiles});
          }}
          className="absolute top-0 right-0 bg-red-500 text-white p-1"
        >
          ×
        </button>
      </div>
    ))}
  </div>
 );

 const handleSubmit = async (e) => {
   e.preventDefault();

   const formData = new FormData();
   formData.append('title', newProduct.title);
   formData.append('price', newProduct.price);
   formData.append('category', newProduct.category);
   formData.append('description', newProduct.description);
   formData.append('mainImage', newProduct.mainImage);
   
   newProduct.sideImages.forEach(image => {
     formData.append('sideImages', image);
   });

   try {
     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
       method: 'POST',
       body: formData,
     });

     if (!response.ok) {
       const errorData = await response.json();
       throw new Error(errorData.message);
     }
     
     // Reset form
     setNewProduct({
       title: '',
       price: '',
       category: '',
       description: '',
       mainImage: null,
       sideImages: []
     });
     
   } catch (error) {
     console.error('Upload error:', error);
   }
 };

 const handleMainImageChange = (e) => {
   setNewProduct({...newProduct, mainImage: e.target.files[0]});
 };

 const handleSideImagesChange = (e) => {
  const newFiles = Array.from(e.target.files);
  const currentFiles = [...newProduct.sideImages];
  const combinedFiles = [...currentFiles, ...newFiles].slice(0, 3);
 
  if (combinedFiles.length > 3) {
    alert("Maximum 3 side images allowed");
    return;
  }
 
  setNewProduct({...newProduct, sideImages: combinedFiles});
 };
 return (
   <div className="max-w-4xl mx-auto p-6">
     <h2 className="text-2xl mb-6">Add New Product</h2>
     <form onSubmit={handleSubmit} className="space-y-4">
       <input
         type="text"
         placeholder="Title"
         value={newProduct.title}
         className="w-full p-2 border rounded"
         onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
       />
       <input
         type="number"
         placeholder="Price"
         value={newProduct.price}
         className="w-full p-2 border rounded"
         onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
       />
       <select
         value={newProduct.category}
         className="w-full p-2 border rounded"
         onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
       >
         <option value="">Select Category</option>
         <option value="home">Home</option>
         <option value="essential">Essential</option>
         <option value="wearable">Wearable</option>
       </select>
       <textarea
         placeholder="Description"
         value={newProduct.description}
         className="w-full p-2 border rounded"
         onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
       />

<div className="space-y-2">
 {/* Main Image Section */}
 <label className="block text-sm font-medium">Main Image</label>
 <input
   type="file"
   className="w-full p-2 border rounded"
   onChange={handleMainImageChange}
 />
 {newProduct.mainImage && (
   <div className="relative w-full">
     <img 
       src={URL.createObjectURL(newProduct.mainImage)} 
       alt="Main preview"
       className="h-48 w-full object-cover"
     />
     <button
       type="button"
       onClick={() => setNewProduct({...newProduct, mainImage: null})}
       className="absolute top-0 right-0 bg-red-500 text-white p-1"
     >
       ×
     </button>
   </div>
 )}
</div>
       
       <div className="space-y-2">
        <label className="block text-sm font-medium">Side Images (Up to 3)</label>
        <input
          type="file"
          multiple
          max="3"
          className="w-full p-2 border rounded"
          onChange={handleSideImagesChange}
        />
        <div className="grid grid-cols-3 gap-2 mt-2">
          {newProduct.sideImages.map((file, index) => (
            <div key={index} className="relative">
              <img 
                src={URL.createObjectURL(file)} 
                alt={`Preview ${index + 1}`}
                className="h-32 w-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  const newFiles = newProduct.sideImages.filter((_, i) => i !== index);
                  setNewProduct({...newProduct, sideImages: newFiles});
                }}
                className="absolute top-0 right-0 bg-red-500 text-white p-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
        Add Product
      </button>
     </form>
   </div>
 );
};

export default AdminDashboard;