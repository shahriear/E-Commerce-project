// import React from 'react';

// const ProductCard = ({ product }) => {
//   const stars = [];
//   const rating = product.rating?.rate || 0;
//   const fullStars = Math.floor(rating);
//   const halfStar = rating - fullStars >= 0.5;

//   for (let i = 0; i < fullStars; i++) {
//     stars.push(<span key={'full' + i}>⭐</span>);
//   }
//   if (halfStar) {
//     stars.push(<span key="half">⭐</span>); // চাইলে আধা star icon ইউজ করতে পারো
//   }
//   while (stars.length < 5) {
//     stars.push(
//       <span key={'empty' + stars.length} className="text-gray-300">
//         ⭐
//       </span>
//     );
//   }

//   return (
//     <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition duration-300 ease-in-out">
//       <img
//         src={product.image}
//         alt={product.title || 'Product Image'}
//         className="w-full h-48 object-contain mb-3"
//         onError={e => {
//           e.target.onerror = null;
//           e.target.src = `https://picsum.photos/200/200?random=${product.id}`;
//         }}
//       />
//       <h3 className="text-sm font-semibold mb-2 line-clamp-2">
//         {product.title}
//       </h3>
//       <p className="text-lg font-bold text-blue-600 mb-2">
//         ${product.price.toFixed(2)}
//       </p>
//       <div className="flex items-center gap-1 text-yellow-500">
//         {stars}{' '}
//         <span className="text-gray-700 ml-1">({rating.toFixed(1)})</span>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
