import { Star } from 'lucide-react';
import React from 'react';

const RatingFilter = ({ setRating }) => {
  return (
    <div className="p-4 bg-white ">
      <h2 className="font-medium text-neutral-950 mb-3">FILTER BY RATING</h2>
      {[5, 4, 3, 2, 1].map(r => (
        <div
          key={r}
          className="flex items-center space-x-0.5 cursor-pointer  py-1.5  hover:translate-x-1 transition"
          onClick={() => setRating(r)}
        >
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={17}
              strokeWidth={1}
              fill={i < r ? 'currentColor' : 'none'}
              className={i < r ? 'text-yellow-500' : 'text-gray-400'}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default RatingFilter;
