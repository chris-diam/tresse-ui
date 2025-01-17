import React from "react";
import PropTypes from "prop-types";

const ProductCard = ({ title, price, category, imageUrl }) => {
  // Capitalize only first letter of title
  const formatTitle = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <div className="flex flex-col group">
      <div className="bg-gray-50 aspect-square w-full overflow-hidden rounded-sm">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "/api/placeholder/400/400";
            e.target.onerror = null;
          }}
        />
      </div>
      <div className="flex flex-col pt-2 sm:pt-3 space-y-1">
        <span className="text-xs sm:text-sm font-medium uppercase">
          {category}
        </span>
        <h3 className="text-xs sm:text-sm font-normal">{formatTitle(title)}</h3>
        <p className="text-xs sm:text-sm text-gray-500">€{price}</p>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  category: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default ProductCard;
