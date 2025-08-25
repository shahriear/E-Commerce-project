import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain mb-3"
        onError={e => {
          e.target.onerror = null;
          e.target.src = `https://picsum.photos/200/200?random=${product.id}`;
        }}
      />
      <h3 className="text-sm font-semibold mb-2 line-clamp-2">
        {product.title}
      </h3>
      <p className="text-lg font-bold text-blue-600 mb-2">${product.price}</p>
      <p className="text-yellow-500">⭐ {product.rating?.rate || 0}</p>
    </div>
  );
};

export default ProductCard;
