// components/HomePage.jsx
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import bg1 from '../assets/bg1.jpg';
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg3.jpg';
import Header from './layout/Header';

const HomePage = () => {
 const navigate = useNavigate();
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
 const images = [bg1, bg2, bg3];

 useEffect(() => {
   const interval = setInterval(() => {
     setCurrentImageIndex((prev) => (prev + 1) % images.length);
   }, 6000);

   return () => clearInterval(interval);
 }, []);

 return (
   <>
     <div className="fixed top-0 w-full z-50">
       <Header />
     </div>
     
     <div className="relative h-screen">
       {images.map((img, index) => (
         <img
           key={index}
           src={img}
           alt={`Slide ${index + 1}`}
           className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
             currentImageIndex === index ? 'opacity-100' : 'opacity-0'
           }`}
         />
       ))}
       
       <div className="absolute inset-0 flex flex-col items-center justify-center">
         <h1 className="text-[#9a8b4e] text-9xl mb-8 tracking-wider">Elevated Modern Classics</h1>
         <button
           onClick={() => navigate('/products')}
           className="text-[#9a8b4e] text-sm border border-[#9a8b4e] px-16 py-2 
           hover:bg-[#9a8b4e] hover:border-[#9a8b4e] hover:text-white transition-colors"
         >
           SHOP
         </button>
        </div>
     </div>
   </>
 );
};

export default HomePage;