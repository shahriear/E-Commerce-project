import React from 'react';

const categories = [
  'All',
  'Man',
  'Woman',
  'Laptops',
  'Smart Watch',
  'Accessories accessories',
  'Cameras',
  'Man Bags',
  'Woman Bags',
  'Man Footwear',
  'Woman Footwear',
];

const CategoryList = ({ onSelect }) => {
  return (
    <div className="p-4 bg-white shadow rounded-2xl">
      <h2 className="font-bold mb-3">Product Categories</h2>
      <ul className="space-y-2">
        {categories.map(cat => (
          <li
            key={cat}
            className="cursor-pointer hover:text-blue-600"
            onClick={() => onSelect(cat.toLowerCase())}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;

// import React, { useEffect, useState } from 'react';

// const CategoryList = ({ onSelect }) => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     // DummyJSON থেকে categories আনবে
//     fetch('https://dummyjson.com/products/categories')
//       .then(res => res.json())
//       .then(data => setCategories(data));
//   }, []);

//   return (
//     <div>
//       <h3 className="font-semibold mb-3">Categories</h3>
//       <ul className="space-y-2">
//         <li
//           onClick={() => onSelect('all')}
//           className="cursor-pointer hover:text-blue-500"
//         >
//           All Products
//         </li>
//         {categories.map((cat, idx) => {
//           const name = typeof cat === 'string' ? cat : cat.name; // string বা object দুই handle করবে
//           return (
//             <li
//               key={idx}
//               onClick={() => onSelect(name)}
//               className="cursor-pointer hover:text-blue-500 capitalize"
//             >
//               {name.replace('-', ' ')}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default CategoryList;
