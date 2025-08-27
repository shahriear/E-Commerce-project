import React from 'react';

const categories = [
  'Man',
  'Woman',
  'Laptops',
  'Smart Phone',
  'Accessories',
  'Furniture',
  'Man Bags',
  'Woman Bags',
  'Man Footwear',
  'Woman Footwear',
];

const ScrollableCategoryFilter = ({ active, onClick }) => {
  return (
    <div className="p-4 bg-white shadow rounded-2xl">
      <h2 className="font-bold mb-3">Categories</h2>
      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => onClick(cat)}
            className={`px-3 py-2 rounded-full border text-left ${
              active === cat
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScrollableCategoryFilter;
