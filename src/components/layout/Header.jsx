import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ShoppingBag, Search, User, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import Cart from "../cart/Cart";
import logo from "../../assets/tresse2.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full bg-[#e4c7b8]  text-white z-50 transition-colors duration-300
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[2000px] mx-auto">
        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-center h-20 px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <a href="#" className="text-sm relative group">
              CLOTHING
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#a47764] transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
            </a>
            <a href="#" className="text-sm relative group">
              ESSENTIALS
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#a47764] transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
            </a>
          </nav>

          <img
            src={logo}
            alt="Tressé"
            className="h-24 w-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex items-center space-x-6">
            <Search className="w-5 h-5 cursor-pointer" />
            <User className="w-5 h-5 cursor-pointer" />
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="ml-1 text-sm">{cart.length}</span>
            </div>
          </div>
        </div>

        {/* Mobile Header - with cart functionality */}
        <div className="md:hidden">
          <div className="flex justify-between items-center h-20 px-4">
            <button onClick={toggleMobileMenu} className="text-gray-600">
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <img
              src={logo}
              alt="Tressé"
              className="h-12 w-auto cursor-pointer"
              onClick={() => navigate("/")}
            />
            <div
              className="flex items-center space-x-4"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="ml-1 text-sm">{cart.length}</span>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="px-4 py-2 bg-white border-t border-gray-200">
              <nav className="flex flex-col space-y-4 pb-4">
                <a
                  href="#"
                  className="text-sm text-[#a4776] relative group inline-block"
                >
                  CLOTHING
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
                </a>
                <a href="#" className="text-sm text-[#a4776] inline-block">
                  ESSENTIALS
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
                </a>

                <div className="flex items-center space-x-4 pt-2">
                  <Search className="w-5 h-5" />
                  <User className="w-5 h-5" />
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
