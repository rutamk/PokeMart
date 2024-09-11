// src/components/ProductList.js
import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className="w-3/4 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-4" />
            <h3 className="text-lg mb-2">{product.name}</h3>
            <p className="text-xl text-blue-500">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
