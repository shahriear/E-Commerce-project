// import React, { useState } from 'react';

// const featured = [
//   {
//     id: 1,
//     name: 'Laptop Pro',
//     price: 1200,
//     img: 'https://via.placeholder.com/100',
//   },
//   {
//     id: 2,
//     name: 'Smart Watch',
//     price: 250,
//     img: 'https://via.placeholder.com/100',
//   },
//   {
//     id: 3,
//     name: 'DSLR Camera',
//     price: 800,
//     img: 'https://via.placeholder.com/100',
//   },
// ];

// const FeaturedProducts = () => {
//   const [index, setIndex] = useState(0);

//   const next = () => setIndex(i => (i + 1) % featured.length);
//   const prev = () => setIndex(i => (i - 1 + featured.length) % featured.length);

//   return (
//     <div className="p-4 bg-white shadow rounded-2xl">
//       <h2 className="font-bold mb-3">Featured Products</h2>
//       <div className="flex items-center justify-between">
//         <button onClick={prev}>◀</button>
//         <div className="text-center">
//           <img src={featured[index].img} alt="" className="mx-auto mb-2" />
//           <p className="font-medium">{featured[index].name}</p>
//           <p className="text-blue-600">৳ {featured[index].price}</p>
//         </div>
//         <button onClick={next}>▶</button>
//       </div>
//     </div>
//   );
// };

// export default FeaturedProducts;
