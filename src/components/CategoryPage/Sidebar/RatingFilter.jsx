import React from 'react';

const RatingFilter = ({ setRating }) => {
  return (
    <div className="p-4 bg-white shadow rounded-2xl">
      <h2 className="font-bold mb-3">Filter by Rating</h2>
      {[5, 4, 3, 2, 1].map(r => (
        <div
          key={r}
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setRating(r)}
        >
          <span>{'⭐'.repeat(r)}</span>
        </div>
      ))}
    </div>
  );
};

export default RatingFilter;
