import React, { useState } from "react";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[2000px] mx-auto">
        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <a href="#" className="text-sm relative group">
              CLOTHING
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
            </a>
            <a href="#" className="text-sm relative group">
              ESSENTIALS
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
            </a>
            <a href="#" className="text-sm relative group">
              ATHLETICS
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
            </a>
          </nav>

          <img src="/logo.png" alt="Tressé" className="h-8 w-auto" />

          <div className="flex items-center space-x-6">
            <Search className="w-5 h-5 cursor-pointer" />
            <User className="w-5 h-5 cursor-pointer" />
            <div className="flex items-center cursor-pointer">
              <ShoppingBag className="w-5 h-5" />
              <span className="ml-1 text-sm">0</span>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          <div className="flex justify-between items-center h-16 px-4">
            <button onClick={toggleMobileMenu} className="text-gray-600">
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <img src="/logo.png" alt="Tressé" className="h-6 w-auto" />

            <div className="flex items-center space-x-4">
              <ShoppingBag className="w-5 h-5" />
              <span className="ml-1 text-sm">0</span>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="px-4 py-2 bg-white border-t border-gray-200">
              <nav className="flex flex-col space-y-4 pb-4">
                <a href="#" className="text-sm relative group inline-block">
                  CLOTHING
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
                </a>
                <a href="#" className="text-sm relative group inline-block">
                  ESSENTIALS
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
                </a>
                <a href="#" className="text-sm relative group inline-block">
                  ATHLETICS
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
    </header>
  );
};

export default Header;
