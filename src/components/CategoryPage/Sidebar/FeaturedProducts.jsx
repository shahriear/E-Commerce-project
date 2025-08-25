import React, { useState } from 'react';

const featured = [
  {
    id: 1,
    name: 'Laptop Pro',
    price: 1200,
    img: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 250,
    img: 'https://via.placeholder.com/100',
  },
  {
    id: 3,
    name: 'DSLR Camera',
    price: 800,
    img: 'https://via.placeholder.com/100',
  },
];

const FeaturedProducts = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex(i => (i + 1) % featured.length);
  const prev = () => setIndex(i => (i - 1 + featured.length) % featured.length);

  return (
    <div className="p-4 bg-white shadow rounded-2xl">
      <h2 className="font-bold mb-3">Featured Products</h2>
      <div className="flex items-center justify-between">
        <button onClick={prev}>◀</button>
        <div className="text-center">
          <img src={featured[index].img} alt="" className="mx-auto mb-2" />
          <p className="font-medium">{featured[index].name}</p>
          <p className="text-blue-600">৳ {featured[index].price}</p>
        </div>
        <button onClick={next}>▶</button>
      </div>
    </div>
  );
};

export default FeaturedProducts;

// import React, { useEffect, useState } from 'react';

// const FeaturedProducts = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch('https://dummyjson.com/products?limit=5&skip=10')
//       .then(res => res.json())
//       .then(data => setProducts(data.products || []))
//       .catch(err => console.error('Error fetching featured:', err));
//   }, []);

//   return (
//     <div className="space-y-4">
//       <h3 className="font-bold text-lg">Featured Products</h3>
//       <ul className="space-y-3">
//         {products.map(product => (
//           <li key={product.id} className="flex gap-3 items-center">
//             <img
//               src={product.thumbnail || 'https://placehold.co/100x100'}
//               alt={product.title}
//               className="w-16 h-16 object-cover rounded"
//               onError={e => (e.target.src = 'https://placehold.co/100x100')}
//             />
//             <div>
//               <p className="text-sm font-medium">{product.title}</p>
//               <p className="text-xs text-gray-500">${product.price}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FeaturedProducts;
