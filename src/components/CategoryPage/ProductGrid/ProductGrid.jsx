// import React from 'react';
// import ProductCard from './ProductCard';

// const dummyProducts = Array.from({ length: 50 }, (_, i) => ({
//   id: i,
//   name: `Product ${i + 1}`,
//   price: Math.floor(Math.random() * 2000),
//   rating: Math.ceil(Math.random() * 5),
//   img: 'https://via.placeholder.com/150',
//   category: i % 2 === 0 ? 'man' : 'woman',
// }));

// const ProductGrid = ({ category, priceRange, rating, view, limit }) => {
//   const filtered = dummyProducts
//     .filter(p => category === 'all' || p.category === category)
//     .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
//     .filter(p => (rating ? p.rating === rating : true))
//     .slice(0, limit);

//   const gridClass =
//     view === 'grid3'
//       ? 'grid grid-cols-3 gap-4'
//       : view === 'grid4'
//       ? 'grid grid-cols-4 gap-4'
//       : 'space-y-4';

//   return (
//     <div className={gridClass}>
//       {filtered.map(p => (
//         <ProductCard key={p.id} product={p} view={view} />
//       ))}
//     </div>
//   );
// };

// export default ProductGrid;

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ category, priceRange, rating, view, limit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Loading শুরু
      let url = 'https://fakestoreapi.com/products';
      if (category && category !== 'all') {
        url = `https://fakestoreapi.com/products/category/${category}`;
      }

      const res = await fetch(url);
      let data = await res.json();

      if (!data || data.length === 0) {
        data = Array.from({ length: limit }, (_, i) => ({
          id: i + 1,
          title: `${category} Product ${i + 1}`,
          price: Math.floor(Math.random() * 5000),
          rating: { rate: Math.ceil(Math.random() * 5) },
          category,
          image: 'https://via.placeholder.com/200x200.png?text=No+Image',
        }));
      }

      data = data.map(p => ({
        ...p,
        image:
          p.image ||
          p.thumbnail ||
          p.images?.[0] ||
          'https://via.placeholder.com/200x200.png?text=No+Image',
      }));

      data = data.filter(
        p => p.price >= priceRange[0] && p.price <= priceRange[1]
      );

      if (rating) data = data.filter(p => Math.round(p.rating.rate) >= rating);

      setProducts(data.slice(0, limit));
      setLoading(false); // Loading শেষ
    };

    fetchProducts();
  }, [category, priceRange, rating, limit]);

  const gridClass =
    view === 'grid3'
      ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'
      : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;

// import React, { useEffect, useState } from 'react';

// const ProductGrid = ({ category, priceRange, rating, view, limit }) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     let url =
//       category && category !== 'all'
//         ? `https://dummyjson.com/products/category/${category}?limit=${limit}`
//         : `https://dummyjson.com/products?limit=${limit}`;

//     fetch(url)
//       .then(res => res.json())
//       .then(data => setProducts(data.products || []))
//       .catch(err => console.error('Error fetching products:', err));
//   }, [category, limit]);

//   return (
//     <div
//       className={`grid ${
//         view === 'grid3'
//           ? 'grid-cols-3'
//           : view === 'grid4'
//           ? 'grid-cols-4'
//           : 'grid-cols-2'
//       } gap-6`}
//     >
//       {products.map(product => (
//         <div
//           key={product.id}
//           className="border rounded-lg p-4 shadow hover:shadow-md transition"
//         >
//           <img
//             src={product.thumbnail || 'https://placehold.co/300x200'}
//             alt={product.title}
//             className="w-full h-40 object-cover mb-3 rounded"
//             onError={e => (e.target.src = 'https://placehold.co/300x200')}
//           />
//           <h4 className="font-semibold">{product.title}</h4>
//           <p className="text-gray-600">${product.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductGrid;
