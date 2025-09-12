// import { X, Star, Heart, Shuffle } from 'lucide-react';
// import { currency } from '../../utils/currency';
// import { useEffect, useState } from 'react';
// import ZoomableImage from '../ZoomableImage/ZoomableImage';
// import { createPortal } from 'react-dom';
// import { FaShoppingCart } from 'react-icons/fa';
// import { toast } from 'react-toastify';

// export default function ProductModal({ product, onClose }) {
//   const [selectedImage, setSelectedImage] = useState(product.thumbnail);
//   const [quantity, setQuantity] = useState(1);
//   useEffect(() => {
//     document.body.style.overflow = 'hidden';

//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, []);

//   if (!product) return null;

//   //  Discount & oldPrice calculation (same as ProductCard)
//   const discount =
//     product.discountPercentage ?? Math.floor(Math.random() * 20) + 5;
//   const oldPrice = (product.price / (1 - discount / 100)).toFixed(0);

//   // Modal content
//   const modalContent = (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl max-w-4xl w-full relative overflow-y-auto max-h-[90vh] shadow-2xl">
//         {/* Header */}
//         <div className="flex items-start justify-between border-b border-gray-300 mx-4 px-6 py-4">
//           <div>
//             <h2 className="text-2xl font-semibold">{product.title}</h2>

//             {/* Rating & brand */}
//             <div className="flex">
//               <p className="text-sm text-gray-500 py-2">
//                 <span className="font-medium text-black">Brands :</span>{' '}
//                 {product.brand}
//               </p>
//               <div className="flex items-center gap-1 text-yellow-500 ml-7">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <Star
//                     key={i}
//                     size={15}
//                     fill={
//                       i < Math.round(product.rating ?? 4)
//                         ? 'currentColor'
//                         : 'transparent'
//                     }
//                   />
//                 ))}
//                 <span className="ml-2 text-gray-600 text-sm">
//                   {product.rating?.toFixed(1)}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="grid md:grid-cols-2 gap-6 p-6">
//           {/* Left: Images */}
//           <div className="bg-gray-100">
//             <ZoomableImage
//               src={selectedImage}
//               alt={product.title}
//               className="w-full h-[350px] object-contain rounded-lg border"
//             />

//             <div className="flex gap-2 pt-5 bg-white">
//               {[product.thumbnail, ...(product.images || [])].map((img, i) => (
//                 <img
//                   key={i}
//                   src={img}
//                   alt={`thumb-${i}`}
//                   className={`w-16 h-16 object-contain rounded-md border cursor-pointer transition ${
//                     img === selectedImage
//                       ? 'border-red-500'
//                       : 'border-gray-400 opacity-50 hover:opacity-100'
//                   }`}
//                   onClick={() => setSelectedImage(img)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Right: Details */}
//           <div className="space-y-5  flex-col">
//             {/* Price + discount */}
//             <div className="flex items-center gap-3">
//               <span className="text-red-600 text-xl font-bold">
//                 {currency(product.price)}
//               </span>
//               <span className="text-gray-500 line-through">
//                 {currency(oldPrice)}
//               </span>
//               <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
//                 {Math.round(discount)}% OFF
//               </span>
//             </div>

//             {/* Stock check */}
//             {product.stock > 0 ? (
//               <p className="text-green-600 font-normal pb-1 bg-green-100 inline px-2 py-0 rounded-2xl">
//                 In stock
//               </p>
//             ) : (
//               <p className="text-red-600 font-normal pb-1 bg-red-100 inline px-2 py-0 rounded-2xl">
//                 Out of stock
//               </p>
//             )}

//             {/* Description */}
//             <p className="text-gray-700 text-sm leading-relaxed mt-7">
//               {product.description || 'No description available.'}
//             </p>

//             {/* Sizes */}
//             {product.sizes && (
//               <div className="flex gap-2 items-center flex-wrap">
//                 <span className="font-medium">Size:</span>
//                 {product.sizes.map(s => (
//                   <button
//                     key={s}
//                     className="px-3 py-1 border rounded-md hover:bg-gray-100 transition"
//                   >
//                     {s}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {/* Quantity + Add to Cart */}
//             <div className="flex items-center gap-3 mt-7">
//               {/* Quantity Selector */}
//               <div className="flex items-center overflow-hidden">
//                 <button
//                   onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                   className="px-3 py-2 bg-gray-200 transition border rounded-full border-gray-400 "
//                 >
//                   -
//                 </button>
//                 <span className="px-4">{quantity}</span>
//                 <button
//                   onClick={() => setQuantity(q => q + 1)}
//                   className="px-3 py-2 bg-gray-200 transition border rounded-full border-gray-400 "
//                 >
//                   +
//                 </button>
//               </div>

//               {/* Add to Cart */}
//               <button
//                 onClick={() => toast.error('Please Login to continue')}
//                 disabled={product.stock <= 0}
//                 className={`px-8 py-2 rounded-full flex items-center justify-center gap-2 font-medium transition
//                    ${
//                      product.stock > 0
//                        ? 'bg-red-500 hover:bg-red-600 text-white'
//                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
//                    }`}
//               >
//                 <FaShoppingCart /> Add To Cart
//               </button>
//             </div>

//             {/* Wishlist & Compare */}
//             <div className="flex gap-7 mt-12">
//               {/* Wishlist */}
//               <div className="relative group">
//                 <button
//                   className="flex items-center gap-1 px-4 py- border rounded-full hover:bg-pink-50 text-pink-600"
//                   onClick={() => toast.error('Please Login to continue')}
//                 >
//                   <Heart size={14} /> Wishlist
//                 </button>
//                 <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-600 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
//                   Add to Wishlist
//                 </span>
//               </div>

//               {/* Compare */}
//               <div className="relative group">
//                 <button
//                   className="flex items-center gap-1 px-4 py- border rounded-full hover:bg-gray-50 text-gray-600"
//                   onClick={() => toast.error('Please Login to continue')}
//                 >
//                   <Shuffle size={14} /> Compare
//                 </button>
//                 <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-600 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
//                   Add to Compare
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return createPortal(modalContent, document.body);
// }

import { X, Star, Heart, Shuffle } from 'lucide-react';
import { currency } from '../../utils/currency';
import { useEffect, useState } from 'react';
import ZoomableImage from '../ZoomableImage/ZoomableImage';
import { createPortal } from 'react-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function ProductModal({ product, onClose }) {
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!product) return null;

  const discount =
    product.discountPercentage ?? Math.floor(Math.random() * 20) + 5;
  const oldPrice = (product.price / (1 - discount / 100)).toFixed(0);

  const modalContent = (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl relative overflow-y-auto max-h-[90vh] shadow-2xl">
        {/* X Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition z-50"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-300 px-6 py-4">
          <div className="flex-1 mt-2 sm:mt-0">
            <h2 className="text-xl sm:text-2xl font-semibold">
              {product.title}
            </h2>
            {/* Rating & Brand */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 sm:mt-1">
              <p className="text-sm text-gray-500">
                <span className="font-medium text-black">Brand:</span>{' '}
                {product.brand}
              </p>
              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    fill={
                      i < Math.round(product.rating ?? 4)
                        ? 'currentColor'
                        : 'transparent'
                    }
                  />
                ))}
                <span className="ml-2 text-gray-600 text-sm">
                  {product.rating?.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left: Images */}
          <div className="flex flex-col">
            <div className="bg-gray-100 rounded-xl flex items-center justify-center p-3">
              <div className="w-full max-w-sm aspect-square flex items-center justify-center">
                <ZoomableImage
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-4 overflow-x-auto pb-2">
              {[product.thumbnail, ...(product.images || [])].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  className={`w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-md border cursor-pointer flex-shrink-0 transition ${
                    img === selectedImage
                      ? 'border-red-500 shadow'
                      : 'border-gray-300 hover:opacity-80'
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col space-y-5">
            {/* Price */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-red-600 text-xl font-bold">
                {currency(product.price)}
              </span>
              <span className="text-gray-500 line-through">
                {currency(oldPrice)}
              </span>
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                {Math.round(discount)}% OFF
              </span>
            </div>

            {/* Stock */}
            {product.stock > 0 ? (
              <p className="text-green-600 bg-green-100 px-2 py-0.5 rounded-2xl text-sm w-fit">
                In stock
              </p>
            ) : (
              <p className="text-red-600 bg-red-100 px-2 py-0.5 rounded-2xl text-sm w-fit">
                Out of stock
              </p>
            )}

            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed">
              {product.description || 'No description available.'}
            </p>

            {/* Sizes */}
            {product.sizes && (
              <div className="flex gap-2 items-center flex-wrap">
                <span className="font-medium">Size:</span>
                {product.sizes.map(s => (
                  <button
                    key={s}
                    className="px-3 py-1 border rounded-md hover:bg-gray-100 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
              <div className="flex items-center border rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => toast.error('Please Login to continue')}
                disabled={product.stock <= 0}
                className={`px-6 py-2 rounded-full flex items-center justify-center gap-2 font-medium transition text-[14px] ${
                  product.stock > 0
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
              >
                <FaShoppingCart /> Add To Cart
              </button>
            </div>

            {/* Wishlist & Compare */}
            <div className="flex flex-wrap gap-3 mt-3">
              {/* Wishlist */}
              <div className="relative group">
                <button
                  className="flex items-center gap-1 px-4 py-1 border rounded-full hover:bg-pink-50 text-pink-600 text-[14px]"
                  onClick={() => toast.error('Please Login to continue')}
                >
                  <Heart size={14} /> Wishlist
                </button>
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-600 rounded-full opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  Add to Wishlist
                </span>
              </div>

              {/* Compare */}
              <div className="relative group">
                <button
                  className="flex items-center gap-1 px-4 py-1 border rounded-full hover:bg-gray-50 text-gray-600 text-[14px]"
                  onClick={() => toast.error('Please Login to continue')}
                >
                  <Shuffle size={14} /> Compare
                </button>
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-600 rounded-full opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  Add to Compare
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
