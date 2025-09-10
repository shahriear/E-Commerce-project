// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const categories = [
//   { name: 'Fashion', icon: '/image/fash.png', bg: 'bg-pink-50' },
//   { name: 'Electronics', icon: '/image/ele.png', bg: 'bg-purple-50' },
//   { name: 'Bags', icon: '/image/bag.png', bg: 'bg-pink-100' },
//   { name: 'Footwear', icon: '/image/foot.png', bg: 'bg-blue-100' },
//   { name: 'Groceries', icon: '/image/gro.png', bg: 'bg-pink-200' },
//   { name: 'Beauty', icon: '/image/beauty.png', bg: 'bg-green-100' },
//   { name: 'Wellness', icon: '/image/well.png', bg: 'bg-pink-50' },
//   { name: 'Jewellery', icon: '/image/jw.png', bg: 'bg-green-200' },
// ];

// const FeaturedManus = () => {
//   const navigate = useNavigate();

//   const handleClick = catName => {
//     // Navigate to FeaturedCategoryPage with slug as param
//     navigate(`/featured/${catName}`);
//   };

//   return (
//     <div className="container mx-auto py-10">
//       <h2 className="text-xl font-semibold mb-5">FEATURED CATEGORIES</h2>
//       <div className="flex justify-evenly gap-12 flex-wrap">
//         {categories.map(cat => (
//           <button
//             key={cat.name}
//             onClick={() => handleClick(cat.name)}
//             className="flex flex-col items-center group cursor-pointer bg-transparent border-none"
//           >
//             <div
//               className={`w-30 h-30 flex items-center justify-center rounded-full border border-gray-200 ${cat.bg} transform transition-all duration-300 group-hover:-translate-y-2 hover:shadow-xl`}
//             >
//               <img
//                 src={cat.icon}
//                 alt={cat.name}
//                 className="w-12 h-12 object-contain group-hover:[animation:smoothBounce_1.5s_ease-in-out_infinite]"
//               />
//             </div>
//             <p className="mt-3 text-sm font-medium">{cat.name}</p>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeaturedManus;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollContainer from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css';

const categories = [
  { name: 'Fashion', icon: '/image/fash.png', bg: 'bg-pink-50' },
  { name: 'Electronics', icon: '/image/ele.png', bg: 'bg-purple-50' },
  { name: 'Bags', icon: '/image/bag.png', bg: 'bg-pink-100' },
  { name: 'Footwear', icon: '/image/foot.png', bg: 'bg-blue-100' },
  { name: 'Groceries', icon: '/image/gro.png', bg: 'bg-pink-200' },
  { name: 'Beauty', icon: '/image/beauty.png', bg: 'bg-green-100' },
  { name: 'Wellness', icon: '/image/well.png', bg: 'bg-pink-50' },
  { name: 'Jewellery', icon: '/image/jw.png', bg: 'bg-green-200' },
];

const FeaturedManus = () => {
  const navigate = useNavigate();

  const handleClick = catName => {
    navigate(`/featured/${catName}`);
  };

  return (
    <div className="md:container mx-auto py-10 ml-3">
      <h2 className="text-xl font-semibold mb-5">FEATURED CATEGORIES</h2>

      {/* Scrollable Drag Container */}
      <ScrollContainer
        className="flex gap-6 md:gap-14 overflow-x-auto cursor-grab active:cursor-grabbing px-1"
        vertical={false}
      >
        {categories.map(cat => (
          <button
            key={cat.name}
            onClick={() => handleClick(cat.name)}
            className="flex-shrink-0 flex flex-col items-center group cursor-pointer bg-transparent border-none"
          >
            <div
              className={`w-28 h-28 flex items-center justify-center rounded-full border border-gray-200 ${cat.bg} transform transition-all duration-300 group-hover:-translate-y-2 hover:shadow-xl`}
            >
              <img
                src={cat.icon}
                alt={cat.name}
                className="w-12 h-12 object-contain group-hover:[animation:smoothBounce_1.5s_ease-in-out_infinite]"
              />
            </div>
            <p className="mt-3 text-sm font-medium whitespace-nowrap">
              {cat.name}
            </p>
          </button>
        ))}
      </ScrollContainer>
    </div>
  );
};

export default FeaturedManus;
