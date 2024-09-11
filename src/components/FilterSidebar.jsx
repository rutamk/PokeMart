// src/components/FilterSidebar.js
import React, { useState } from 'react';

const categories = ['All', 'Dresses', 'Suits', 'Shirts'];
const sizes = ['All', 'S', 'M', 'L', 'XL'];

const FilterSidebar = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSize, setSelectedSize] = useState('All');

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onFilterChange({ category, priceRange, size: selectedSize });
  };

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setSelectedSize(size);
    onFilterChange({ category: selectedCategory, priceRange, size });
  };

  const handlePriceChange = (e) => {
    const [min, max] = e.target.value.split(',').map(Number);
    setPriceRange([min, max]);
    onFilterChange({ category: selectedCategory, priceRange: [min, max], size: selectedSize });
  };

  return (
    <div className="w-1/4 p-4 border-r">
      <h2 className="text-xl mb-4">Filters</h2>
      <div>
        <h3 className="text-lg mb-2">Category</h3>
        <select onChange={handleCategoryChange} value={selectedCategory} className="w-full mb-4 p-2 border">
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div>
        <h3 className="text-lg mb-2">Price Range</h3>
        <input
          type="text"
          placeholder="0,1000"
          value={priceRange.join(',')}
          onChange={handlePriceChange}
          className="w-full mb-4 p-2 border"
        />
      </div>
      <div>
        <h3 className="text-lg mb-2">Size</h3>
        <select onChange={handleSizeChange} value={selectedSize} className="w-full mb-4 p-2 border">
          {sizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
