import { X, Star, Heart, Shuffle } from 'lucide-react';
import { currency } from '../../utils/currency';
import { useEffect, useState } from 'react';
import ZoomableImage from '../ZoomableImage/ZoomableImage';
import { createPortal } from 'react-dom';
import { FaShoppingCart } from 'react-icons/fa';

export default function ProductModal({ product, onClose }) {
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    // modal open হলে body scroll বন্ধ
    document.body.style.overflow = 'hidden';

    return () => {
      // modal বন্ধ হলে আবার scroll চালু
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!product) return null;

  //  Discount & oldPrice calculation (same as ProductCard)
  const discount =
    product.discountPercentage ?? Math.floor(Math.random() * 20) + 5;
  const oldPrice = (product.price / (1 - discount / 100)).toFixed(0);

  // Modal content
  const modalContent = (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full relative overflow-y-auto max-h-[90vh] shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-300 mx-4 px-6 py-4">
          <div>
            <h2 className="text-2xl font-semibold">{product.title}</h2>

            {/* Rating & brand */}
            <div className="flex">
              <p className="text-sm text-gray-500 py-2">
                <span className="font-medium text-black">Brands :</span>{' '}
                {product.brand}
              </p>
              <div className="flex items-center gap-1 text-yellow-500 ml-7">
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
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Left: Images */}
          <div className="bg-gray-100">
            <ZoomableImage
              src={selectedImage}
              alt={product.title}
              className="w-full h-[350px] object-contain rounded-lg border"
            />

            <div className="flex gap-2 pt-5 bg-white">
              {[product.thumbnail, ...(product.images || [])].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  className={`w-16 h-16 object-contain rounded-md border cursor-pointer transition ${
                    img === selectedImage
                      ? 'border-red-500'
                      : 'border-gray-400 opacity-50 hover:opacity-100'
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-5  flex-col">
            {/* Price + discount */}
            <div className="flex items-center gap-3">
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

            {/* Stock check */}
            {product.stock > 0 ? (
              <p className="text-green-600 font-normal pb-1 bg-green-100 inline px-2 py-0 rounded-2xl">
                In stock
              </p>
            ) : (
              <p className="text-red-600 font-normal pb-1 bg-red-100 inline px-2 py-0 rounded-2xl">
                Out of stock
              </p>
            )}

            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed mt-7">
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
            <div className="flex items-center gap-3 mt-7">
              {/* Quantity Selector */}
              <div className="flex items-center overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-2 bg-gray-200 transition border rounded-full border-gray-400 "
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-2 bg-gray-200 transition border rounded-full border-gray-400 "
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                disabled={product.stock <= 0}
                className={`px-8 py-2 rounded-full flex items-center justify-center gap-2 font-medium transition
                   ${
                     product.stock > 0
                       ? 'bg-red-500 hover:bg-red-600 text-white'
                       : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                   }`}
              >
                <FaShoppingCart /> Add To Cart
              </button>
            </div>

            {/* Wishlist & Compare */}
            <div className="flex gap-7 mt-12">
              {/* Wishlist */}
              <div className="relative group">
                <button className="flex items-center gap-1 px-4 py- border rounded-full hover:bg-pink-50 text-pink-600">
                  <Heart size={14} /> Wishlist
                </button>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-600 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  Add to Wishlist
                </span>
              </div>

              {/* Compare */}
              <div className="relative group">
                <button className="flex items-center gap-1 px-4 py- border rounded-full hover:bg-gray-50 text-gray-600">
                  <Shuffle size={14} /> Compare
                </button>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-600 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
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

// import { X, Star } from 'lucide-react';
// import { currency } from '../../utils/currency';
// import { useEffect, useState } from 'react';
// import ZoomableImage from '../ZoomableImage/ZoomableImage';
// import { createPortal } from 'react-dom';

// export default function ProductModal({ product, onClose }) {
//   const [selectedImage, setSelectedImage] = useState(product?.thumbnail);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedRam, setSelectedRam] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);

//   const ramOptions = ['4GB', '6GB', '8GB', '12GB'];
//   const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];

//   const isElectronics =
//     product.category === 'smartphones' || product.category === 'laptops';
//   const isClothing =
//     product.category === 'mens-shirts' ||
//     product.category === 'womens-dresses' ||
//     product.category === 'tops';

//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, []);

//   if (!product) return null;

//   const discount = product.discountPercentage ?? Math.floor(Math.random() * 20) + 5;
//   const oldPrice = (product.price / (1 - discount / 100)).toFixed(0);

//   const modalContent = (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl max-w-4xl w-full relative overflow-y-auto max-h-[90vh] shadow-2xl">
//         {/* Header */}
//         <div className="flex items-start justify-between border-b border-gray-300 mx-4 px-6 py-4">
//           <div>
//             <h2 className="text-2xl font-semibold">{product.title}</h2>
//             <div className="flex items-center gap-4 mt-1">
//               <p className="text-sm text-gray-500">
//                 <span className="font-medium text-black">Brand:</span> {product.brand}
//               </p>
//               <div className="flex items-center gap-1 text-yellow-500">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <Star
//                     key={i}
//                     size={18}
//                     fill={i < Math.round(product.rating ?? 4) ? 'currentColor' : 'transparent'}
//                   />
//                 ))}
//                 <span className="ml-2 text-gray-600 text-sm">{product.rating?.toFixed(1)}</span>
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
//           <div className="flex flex-col">
//             <div className="w-full max-h-[500px] mb-4">
//               <ZoomableImage
//                 src={selectedImage}
//                 alt={product.title}
//                 className="w-full h-full object-contain rounded-lg border"
//               />
//             </div>
//             <div className="flex gap-2 overflow-x-auto">
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
//           <div className="flex flex-col justify-between">
//             {/* Price & Discount */}
//             <div className="flex items-center gap-3 mb-2">
//               <span className="text-red-600 text-xl font-bold">{currency(product.price)}</span>
//               <span className="text-gray-500 line-through">{currency(oldPrice)}</span>
//               <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
//                 {Math.round(discount)}% OFF
//               </span>
//             </div>

//             {/* Stock */}
//             {product.stock > 0 ? (
//               <p className="text-green-600 font-medium pb-1">In stock</p>
//             ) : (
//               <p className="text-red-600 font-medium pb-1">Out of stock</p>
//             )}

//             {/* Description */}
//             <p className="text-gray-700 text-sm leading-relaxed mb-4">
//               {product.description || 'No description available.'}
//             </p>

//             {/* RAM Selection (Electronics) */}
//             {isElectronics && (
//               <div className="mb-4">
//                 <span className="font-medium">Select RAM:</span>
//                 <div className="flex gap-2 flex-wrap mt-1">
//                   {ramOptions.map(ram => (
//                     <button
//                       key={ram}
//                       onClick={() => setSelectedRam(ram)}
//                       className={`px-3 py-1 border rounded-md hover:bg-gray-100 transition ${
//                         selectedRam === ram
//                           ? 'bg-blue-600 text-white border-blue-600'
//                           : 'bg-gray-100 border-gray-300'
//                       }`}
//                     >
//                       {ram}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Size Selection (Clothing) */}
//             {isClothing && (
//               <div className="mb-4">
//                 <span className="font-medium">Select Size:</span>
//                 <div className="flex gap-2 flex-wrap mt-1">
//                   {sizeOptions.map(size => (
//                     <button
//                       key={size}
//                       onClick={() => setSelectedSize(size)}
//                       className={`px-3 py-1 border rounded-md hover:bg-gray-100 transition ${
//                         selectedSize === size
//                           ? 'bg-green-600 text-white border-green-600'
//                           : 'bg-gray-100 border-gray-300'
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Quantity + Add to Cart */}
//             <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
//               <div className="flex items-center border rounded-full overflow-hidden">
//                 <button
//                   onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                   className="px-3 py-2 bg-gray-200 hover:bg-gray-300 transition"
//                 >
//                   -
//                 </button>
//                 <span className="px-4">{quantity}</span>
//                 <button
//                   onClick={() => setQuantity(q => q + 1)}
//                   className="px-3 py-2 bg-gray-200 hover:bg-gray-300 transition"
//                 >
//                   +
//                 </button>
//               </div>

//               <button
//                 disabled={product.stock <= 0}
//                 className={`px-6 py-3 rounded-full flex items-center justify-center gap-2 font-medium transition
//                   ${product.stock > 0 ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
//               >
//                 🛒 Add To Cart
//               </button>
//             </div>

//             {/* Wishlist + Compare */}
//             <div className="flex gap-3">
//               <button className="px-4 py-2 rounded-full border border-gray-300 bg-gray-50 hover:bg-gray-200 transition text-sm flex items-center justify-center gap-1">
//                 ♥ Wishlist
//               </button>
//               <button className="px-4 py-2 rounded-full border border-gray-300 bg-gray-50 hover:bg-gray-200 transition text-sm flex items-center justify-center gap-1">
//                 ⇄ Compare
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return createPortal(modalContent, document.body);
// }
