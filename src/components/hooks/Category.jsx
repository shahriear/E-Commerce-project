// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const Category = () => {
//   const { name } = useParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(
//           `https://dummyjson.com/products/category/${name}`
//         );
//         const data = await res.json();
//         setProducts(data.products);
//       } catch (err) {
//         console.error('Error fetching products:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [name]);

//   return (
//     <div className="container mx-auto py-10">
//       <h2 className="text-2xl font-semibold mb-5 capitalize">{name}</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : products.length > 0 ? (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {products.map(product => (
//             <div
//               key={product.id}
//               className="border rounded-lg p-4 hover:shadow-md transition"
//             >
//               <img
//                 src={product.thumbnail}
//                 alt={product.title}
//                 className="w-full h-40 object-cover rounded-md"
//               />
//               <h3 className="mt-3 font-medium">{product.title}</h3>
//               <p className="text-sm text-gray-600">${product.price}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No products found for this category.</p>
//       )}
//     </div>
//   );
// };

// export default Category;
