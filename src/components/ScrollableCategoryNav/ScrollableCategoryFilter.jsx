import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

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
    <div className="p-4 bg-white ">
      <h2 className="font-medium mb-3">PRODUCT CATEGORIES</h2>
      <div className="flex flex-col gap-2 max-h-63 overflow-y-auto pr-1">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => onClick(cat)}
            className={`flex items-center gap-3 px-3 py-2 rounded-full  transition-all duration-200 
              ${
                active === cat
                  ? 'bg-blue-50 text-blue-600 border-blue-500 font-semibold'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {/* Circle indicator */}
            {active === cat ? (
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
            ) : (
              <Circle className="w-4 h-4 text-gray-400" />
            )}
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScrollableCategoryFilter;
