// src/components/SortOptions.js
import React from 'react';

const SortOptions = ({ onSortChange }) => {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="w-1/4 p-4 border-r">
      <h2 className="text-xl mb-4">Sort By</h2>
      <select onChange={handleSortChange} className="w-full p-2 border">
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="newest">Newest Arrivals</option>
      </select>
    </div>
  );
};

export default SortOptions;
