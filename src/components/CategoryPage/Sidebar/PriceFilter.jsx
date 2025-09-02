import React from 'react';

const PriceFilter = ({ priceRange, setPriceRange }) => {
  return (
    <div className="p-4 bg-white shadow rounded-2xl ">
      <h2 className="font-bold mb-3">FILTER BY PRICE</h2>
      <input
        type="range"
        min="0"
        max="2000"
        step="50"
        value={priceRange[1]}
        onChange={e => setPriceRange([0, +e.target.value])}
        className="w-full"
      />
      <p className="mt-2 text-sm font-medium ">
        Rs {priceRange[0]} - Rs {priceRange[1]}
      </p>
    </div>
  );
};

export default PriceFilter;
