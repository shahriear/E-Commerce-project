import { useState } from 'react';
import { Star, Heart, Expand } from 'lucide-react';
import { currency } from '../../utils/currency';
import { toast } from 'react-toastify';
import ProductModal from '../Model/ProductModal';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, view }) {
  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const discount =
    product.discountPercentage ?? Math.floor(Math.random() * 20) + 5;
  const oldPrice = (product.price / (1 - discount / 100)).toFixed(0);
  const rating = product.rating ?? 4.2;

  const mainImage = product.thumbnail;
  const hoverImage = product.images?.[1] || mainImage;

  const isListView = view === 'list';

  return (
    <>
      <div
        className={`group relative rounded-2xl bg-gray-200 shadow-sm transition-all duration-300
        hover:shadow-xl hover:translate-y-0.5 cursor-pointer
        ${isListView ? 'flex items-center gap-4 p-3 h-[180px]' : 'p-3'}
      `}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {/* Discount badge */}
        <div className="absolute left-2 top-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white z-10">
          {Math.round(discount)}%
        </div>
        {/* Hover actions */}
        <div
          className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
            onClick={() => setShowModal(true)}
          >
            <Expand size={19} strokeWidth={1} />
          </button>
          <button
            className="p-2 bg-white rounded-full shadow hover:bg-red-100"
            onClick={() => toast.error('Please Login to continue')}
          >
            <Heart size={20} className="text-red-500" />
          </button>
        </div>

        {/* Image */}
        <div
          className={`overflow-hidden rounded-xl  flex items-center justify-center relative 
          ${
            isListView
              ? 'w-40 h-40 flex-shrink-0'
              : 'h-44 w-36 lg:h-50 lg:w-51 '
          }`}
        >
          <img
            src={mainImage}
            alt={product.title}
            className={`absolute h-full w-full object-contain transition-all duration-500 ease-in-out  ${
              hovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
            }`}
          />
          <img
            src={hoverImage}
            alt={product.title}
            className={`absolute h-full w-full object-contain transition-all duration-500 ease-in-out ${
              hovered ? 'scale-104 opacity-100' : 'scale-100 opacity-0'
            }`}
          />
        </div>

        {/* Details */}
        <div
          className={`${isListView ? 'flex-1 space-y-1' : 'mt-3 space-y-1'}`}
        >
          <h3 className="line-clamp-2 text-[13px] md:text-[16px] font-bold text-gray-800">
            {product.title}
          </h3>

          {/* Stock check */}
          {product.stock > 0 ? (
            <p className="text-green-600 text-[13px] md:text-[15px] font-normal pb-1">
              In Stock
            </p>
          ) : (
            <p className="text-red-600 font-normal pb-1 text-[13px] md:text-[15px]">
              Out of Stock
            </p>
          )}

          <div className="flex items-center gap-1 text-amber-500 text-xs">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.round(rating) ? 'currentColor' : 'transparent'}
              />
            ))}
            <span className="ml-1 text-gray-500">{rating.toFixed(1)}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 line-through font-medium text-[13px] md:text-[16px]">
              {currency(oldPrice)}
            </span>
            <span className="text-red-500 font-medium text-[14px] md:text-[16px]">
              {currency(product.price)}
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ProductModal product={product} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
// -----------
// import { useState } from 'react';
// import { Star, Heart, Expand } from 'lucide-react';
// import { currency } from '../../utils/currency';
// import { toast } from 'react-toastify';
// import ProductModal from '../Model/ProductModal';
// import { useNavigate } from 'react-router-dom';

// export default function ProductCard({ product, view }) {
//   const [hovered, setHovered] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   const discount =
//     product.discountPercentage ?? Math.floor(Math.random() * 20) + 5;
//   const oldPrice = (product.price / (1 - discount / 100)).toFixed(0);
//   const rating = product.rating ?? 4.2;

//   const mainImage = product.thumbnail;
//   const hoverImage = product.images?.[1] || mainImage;
//   const isListView = view === 'list';

//   return (
//     <>
//       <div
//         className={`group relative rounded-2xl bg-gray-200 shadow-sm transition-all duration-300
//           hover:shadow-xl hover:translate-y-0.5 cursor-pointer
//           ${
//             isListView
//               ? 'flex flex-col sm:flex-row items-center gap-4 p-3 sm:h-[180px]'
//               : 'p-3'
//           }
//         `}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         onClick={() => navigate(`/product/${product.id}`)}
//       >
//         {/* Discount badge */}
//         <div className="absolute left-2 top-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white z-10">
//           {Math.round(discount)}%
//         </div>

//         {/* Hover actions */}
//         <div
//           className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
//           onClick={e => e.stopPropagation()}
//         >
//           <button
//             className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
//             onClick={() => setShowModal(true)}
//           >
//             <Expand size={19} strokeWidth={1} />
//           </button>
//           <button
//             className="p-2 bg-white rounded-full shadow hover:bg-red-100"
//             onClick={() => toast.error('Please Login to continue')}
//           >
//             <Heart size={20} className="text-red-500" />
//           </button>
//         </div>

//         {/* Image */}
//         <div
//           className={`overflow-hidden rounded-xl flex items-center justify-center relative
//             ${
//               isListView
//                 ? 'w-full sm:w-40 sm:h-40 flex-shrink-0'
//                 : 'w-full h-52 sm:h-60'
//             }
//           `}
//         >
//           <img
//             src={mainImage}
//             alt={product.title}
//             className={`absolute h-full w-full object-contain transition-all duration-500 ease-in-out ${
//               hovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
//             }`}
//           />
//           <img
//             src={hoverImage}
//             alt={product.title}
//             className={`absolute h-full w-full object-contain transition-all duration-500 ease-in-out ${
//               hovered ? 'scale-104 opacity-100' : 'scale-100 opacity-0'
//             }`}
//           />
//         </div>

//         {/* Details */}
//         <div
//           className={`${
//             isListView ? 'flex-1 space-y-1 mt-2 sm:mt-0' : 'mt-3 space-y-1'
//           }`}
//         >
//           <h3 className="line-clamp-2 text-[14px] font-bold text-gray-800">
//             {product.title}
//           </h3>

//           {/* Stock check */}
//           {product.stock > 0 ? (
//             <p className="text-green-600 font-normal pb-1">In Stock</p>
//           ) : (
//             <p className="text-red-600 font-normal pb-1">Out of Stock</p>
//           )}

//           {/* Rating */}
//           <div className="flex items-center gap-1 text-amber-500 text-xs">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <Star
//                 key={i}
//                 size={14}
//                 fill={i < Math.round(rating) ? 'currentColor' : 'transparent'}
//               />
//             ))}
//             <span className="ml-1 text-gray-500">{rating.toFixed(1)}</span>
//           </div>

//           {/* Price */}
//           <div className="flex items-center gap-2">
//             <span className="text-gray-500 line-through font-medium">
//               {currency(oldPrice)}
//             </span>
//             <span className="text-red-500 font-medium">
//               {currency(product.price)}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <ProductModal product={product} onClose={() => setShowModal(false)} />
//       )}
//     </>
//   );
// }
