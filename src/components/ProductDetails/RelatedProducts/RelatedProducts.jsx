// import { useEffect, useState } from 'react';
// import { currency } from '../../../utils/currency';
// import { ChevronLeft, ChevronRight, Expand, Heart, Star } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import ProductModal from '../../Model/ProductModal';
// import { toast } from 'react-toastify';

// export default function RelatedProducts({ category, currentProductId }) {
//   const [products, setProducts] = useState([]);
//   const [startIndex, setStartIndex] = useState(0);
//   const [modalProduct, setModalProduct] = useState(null);
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const navigate = useNavigate();
//   const visibleCount = 4;
//   const itemWidth = 240;

//   useEffect(() => {
//     if (!category) return;
//     fetch(`https://dummyjson.com/products/category/${category}`)
//       .then(res => res.json())
//       .then(data => {
//         const filtered = (data.products || []).filter(
//           p => p.id !== currentProductId
//         );
//         setProducts(filtered);
//         setStartIndex(0);
//       });
//   }, [category, currentProductId]);

//   const handlePrev = () => {
//     setStartIndex(prev => Math.max(prev - visibleCount, 0));
//   };

//   const handleNext = () => {
//     setStartIndex(prev =>
//       Math.min(prev + visibleCount, products.length - visibleCount)
//     );
//   };

//   if (!products.length) return null;

//   return (
//     <div className="mt-12">
//       <h2 className="text-2xl font-bold mb-4">Related Products</h2>
//       <div className="relative">
//         {/* Arrow Left */}
//         {startIndex > 0 && (
//           <button
//             onClick={handlePrev}
//             className="absolute -left-10 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10"
//           >
//             <ChevronLeft size={24} />
//           </button>
//         )}

//         {/* Slider Wrapper */}
//         <div className="overflow-x-auto">
//           <div
//             className="flex gap-4 transition-transform duration-700 ease-in-out"
//             style={{ transform: `translateX(-${startIndex * itemWidth}px)` }}
//           >
//             {products.map((product, index) => {
//               const rating = product.rating ?? 4.2;
//               const mainImage = product.thumbnail;
//               const hoverImage = product.images?.[1] || mainImage;

//               return (
//                 <div
//                   key={product.id}
//                   className="flex-shrink-0 w-56 bg-gray-200 shadow-md rounded-xl p-4 cursor-pointer hover:shadow-lg transition relative"
//                   onMouseEnter={() => setHoveredIndex(index)}
//                   onMouseLeave={() => setHoveredIndex(null)}
//                 >
//                   {/* Top-Right Icons */}
//                   <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
//                     <button
//                       onClick={() => setModalProduct(product)}
//                       className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
//                     >
//                       <Expand size={19} strokeWidth={1} />
//                     </button>
//                     <button
//                       className="p-2 bg-white rounded-full shadow hover:bg-red-100"
//                       onClick={() => toast.error('Please Login to continue')}
//                     >
//                       <Heart size={20} className="text-red-500" />
//                     </button>
//                   </div>

//                   {/* Image Swap on Hover */}
//                   <div className="relative w-full h-60 mb-2 rounded-lg bg-gray-300 overflow-hidden">
//                     <img
//                       src={mainImage}
//                       alt={product.title}
//                       className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ${
//                         hoveredIndex === index
//                           ? 'opacity-0 scale-105'
//                           : 'opacity-100 scale-100'
//                       }`}
//                       onClick={() => navigate(`/product/${product.id}`)}
//                     />
//                     <img
//                       src={hoverImage}
//                       alt={`${product.title}-hover`}
//                       className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ${
//                         hoveredIndex === index
//                           ? 'opacity-100 scale-105'
//                           : 'opacity-0 scale-100'
//                       }`}
//                       onClick={() => navigate(`/product/${product.id}`)}
//                     />
//                   </div>

//                   <h3 className="text-sm font-medium mb-1">{product.title}</h3>

//                   {/* Stock check */}
//                   {product.stock > 0 ? (
//                     <p className="text-green-600 font-normal pb-1">In Stock</p>
//                   ) : (
//                     <p className="text-red-600 font-normal pb-1">
//                       Out of Stock
//                     </p>
//                   )}

//                   {/* Rating */}
//                   <div className="flex items-center gap-1 text-amber-500 text-xs mb-1">
//                     {Array.from({ length: 5 }).map((_, i) => (
//                       <Star
//                         key={i}
//                         size={14}
//                         fill={
//                           i < Math.round(rating)
//                             ? 'currentColor'
//                             : 'transparent'
//                         }
//                       />
//                     ))}
//                     <span className="ml-1 text-gray-500">
//                       {rating.toFixed(1)}
//                     </span>
//                   </div>

//                   {/* Price */}
//                   <p className="text-red-600 font-bold">
//                     {currency(product.price)}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Arrow Right */}
//         {startIndex + visibleCount < products.length && (
//           <button
//             onClick={handleNext}
//             className="absolute -right-10 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10"
//           >
//             <ChevronRight size={24} />
//           </button>
//         )}
//       </div>

//       {/* Product Modal */}
//       {modalProduct && (
//         <ProductModal
//           product={modalProduct}
//           onClose={() => setModalProduct(null)}
//         />
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { currency } from '../../../utils/currency';
import { ChevronLeft, ChevronRight, Expand, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductModal from '../../Model/ProductModal';
import { toast } from 'react-toastify';

export default function RelatedProducts({ category, currentProductId }) {
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [modalProduct, setModalProduct] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  // responsive visibleCount
  const [visibleCount, setVisibleCount] = useState(4);
  const [itemWidth, setItemWidth] = useState(240);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(2);
        setItemWidth(width / 2 - 24); // ছোট স্ক্রিনে ২টা প্রোডাক্ট
      } else if (width < 1024) {
        setVisibleCount(3);
        setItemWidth(width / 3 - 24); // মাঝারি স্ক্রিনে ৩টা প্রোডাক্ট
      } else {
        setVisibleCount(4);
        setItemWidth(240); // বড় স্ক্রিনে fixed width
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  useEffect(() => {
    if (!category) return;
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then(res => res.json())
      .then(data => {
        const filtered = (data.products || []).filter(
          p => p.id !== currentProductId
        );
        setProducts(filtered);
        setStartIndex(0);
      });
  }, [category, currentProductId]);

  const handlePrev = () => {
    setStartIndex(prev => Math.max(prev - visibleCount, 0));
  };

  const handleNext = () => {
    setStartIndex(prev =>
      Math.min(prev + visibleCount, products.length - visibleCount)
    );
  };

  if (!products.length) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="relative">
        {/* Arrow Left */}
        {startIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10 hidden sm:flex "
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Slider Wrapper */}
        <div className="overflow-x-auto">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out "
            style={{ transform: `translateX(-${startIndex * itemWidth}px)` }}
          >
            {products.map((product, index) => {
              const rating = product.rating ?? 4.2;
              const mainImage = product.thumbnail;
              const hoverImage = product.images?.[1] || mainImage;

              return (
                <div
                  key={product.id}
                  className="flex-shrink-0 / max-w-[41%] bg-gray-100 shadow-md rounded-xl p-4 cursor-pointer hover:shadow-lg transition relative scrollbar-hide "
                  style={{ width: itemWidth }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Top-Right Icons */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
                    <button
                      onClick={() => setModalProduct(product)}
                      className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
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

                  {/* Image Swap on Hover */}
                  <div className="relative w-full h-52 sm:h-60 mb-2 rounded-lg bg-gray-300 overflow-hidden ">
                    <img
                      src={mainImage}
                      alt={product.title}
                      className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ${
                        hoveredIndex === index
                          ? 'opacity-0 scale-105'
                          : 'opacity-100 scale-100'
                      }`}
                      onClick={() => navigate(`/product/${product.id}`)}
                    />
                    <img
                      src={hoverImage}
                      alt={`${product.title}-hover`}
                      className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ${
                        hoveredIndex === index
                          ? 'opacity-100 scale-105'
                          : 'opacity-0 scale-100'
                      }`}
                      onClick={() => navigate(`/product/${product.id}`)}
                    />
                  </div>

                  <h3 className="text-sm font-medium mb-1 line-clamp-1">
                    {product.title}
                  </h3>

                  {/* Stock check */}
                  {product.stock > 0 ? (
                    <p className="text-green-600 font-normal pb-1">In Stock</p>
                  ) : (
                    <p className="text-red-600 font-normal pb-1">
                      Out of Stock
                    </p>
                  )}

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-amber-500 text-xs mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={
                          i < Math.round(rating)
                            ? 'currentColor'
                            : 'transparent'
                        }
                      />
                    ))}
                    <span className="ml-1 text-gray-500">
                      {rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Price */}
                  <p className="text-red-600 font-bold">
                    {currency(product.price)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Arrow Right */}
        {startIndex + visibleCount < products.length && (
          <button
            onClick={handleNext}
            className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10 hidden sm:flex scrollbar-hide"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {/* Product Modal */}
      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
        />
      )}
    </div>
  );
}
