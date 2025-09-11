// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { Heart, Shuffle, Star } from 'lucide-react';
// import { currency } from '../../utils/currency';
// import ZoomableImage from '../ZoomableImage/ZoomableImage';
// import ProductTabs from './ProductTabs';
// import RelatedProducts from '../ProductDetails/RelatedProducts/RelatedProducts';
// import { FaShoppingCart } from 'react-icons/fa';
// import { toast } from 'react-toastify';

// export default function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedRam, setSelectedRam] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(null);

//   //  New state for controlling tabs
//   const [activeTab, setActiveTab] = useState('description');

//   const [loading, setLoading] = useState(true); // loading state

//   const ramOptions = ['4GB', '6GB', '8GB', '12GB'];
//   const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];

//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true); //  product change হলে spinner শুরু
//       try {
//         const res = await fetch(`https://dummyjson.com/products/${id}`);
//         const data = await res.json();
//         setProduct(data);
//         setSelectedImage(data.thumbnail);
//       } catch (err) {
//         console.error('Error fetching product:', err);
//       } finally {
//         setLoading(false); //  fetch শেষ হলে spinner বন্ধ
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[70vh]">
//         <div className="w-12 h-12 border-4 border-gray-300 border-b-blue-800 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (!product)
//     return <p className="p-6 text-center my-64">Product not found...</p>;

//   const isElectronics =
//     product.category === 'smartphones' || product.category === 'laptops';
//   const isClothing =
//     product.category === 'mens-shirts' ||
//     product.category === 'womens-dresses' ||
//     product.category === 'tops';

//   const discount =
//     product.discountPercentage ?? Math.floor(Math.random() * 20) + 5;
//   const oldPrice = (product.price / (1 - discount / 100)).toFixed(0);

//   // Additional Info for Tabs
//   const additionalInfo = [
//     { label: 'Brand', value: product.brand || 'N/A' },
//     { label: 'Category', value: product.category || 'N/A' },
//     { label: 'Stock', value: product.stock || 'N/A' },
//     { label: 'Warranty', value: '1 Year Official Warranty' },
//     { label: 'Stand Up', value: '35″L x 24″W x 37-45″H (front to back wheel)' },
//     { label: 'Folded (w/o wheels)', value: '32.5″L x 18.5″W x 16.5″H' },
//     { label: 'Folded (w/ wheels)', value: '32.5″L x 24″W x 18.5″H' },
//     { label: 'Door Pass Through', value: '24' },
//     { label: 'Frame', value: 'Aluminum' },
//     { label: 'Weight (w/o wheels)', value: '20 LBS' },
//     { label: 'Weight Capacity', value: '60 LBS' },
//     { label: 'Width', value: '24″' },
//     { label: 'Handle height', value: '37-45″' },
//     { label: 'Wheels', value: '12″ air / wide track slick tread' },
//     { label: 'Seat back height', value: '21.5″' },
//     { label: 'Head room (inside canopy)', value: '25″' },
//     { label: 'Color', value: 'Black, Blue, Red, White' },
//     { label: 'Size', value: 'M, S' },
//   ];

//   // Dummy Reviews
//   const reviews = [
//     {
//       user: 'Hemant Kumar',
//       date: '2025-08-30',
//       comment: 'Great product!',
//       rating: 4.3,
//     },
//     {
//       user: 'Pritam Awatade',
//       date: '2024-11-02',
//       comment: 'Average quality.',
//       rating: 3,
//     },
//     {
//       user: 'Pritam Awatade',
//       date: '2024-11-09',
//       comment: 'Good quality.',
//       rating: 5,
//     },
//     {
//       user: 'Pritam Awatade',
//       date: '2024-11-02',
//       comment: 'Average quality.',
//       rating: 3,
//     },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Top Section */}
//       <div className="grid lg:grid-cols-3 gap-10 bg-white rounded-2xl shadow-md p-7">
//         {/* Left: Images */}
//         <div>
//           <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-center">
//             <ZoomableImage
//               src={selectedImage}
//               alt={product.title}
//               className="w-full h-[380px] object-contain rounded-lg"
//             />
//           </div>
//           <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
//             {[product.thumbnail, ...(product.images || [])].map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 alt={`thumb-${i}`}
//                 className={`w-20 h-20 object-contain rounded-lg border cursor-pointer transition-all duration-200 ${
//                   img === selectedImage
//                     ? 'border-pink-600 shadow-md'
//                     : 'border-gray-300 hover:opacity-80'
//                 }`}
//                 onClick={() => setSelectedImage(img)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Right: Product Info */}
//         <div className="flex flex-col justify-between">
//           <div>
//             <h1 className="text-3xl font-bold mb-3">{product.title}</h1>

//             {/* Brand & Rating */}
//             <div className="flex flex-wrap items-center gap-6 mb-3">
//               <p className="text-sm text-gray-600">
//                 <span className="font-medium text-black">Brand: </span>
//                 {product.brand}
//               </p>
//               <div className="flex items-center gap-1 text-yellow-500">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <Star
//                     key={i}
//                     size={18}
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

//               {/*  Clickable Review count */}
//               <button
//                 onClick={() => setActiveTab('reviews')}
//                 className="text-gray-400 hover:text-pink-600 transition"
//               >
//                 {reviews.length} Reviews
//               </button>
//             </div>

//             {/* Price & Discount */}
//             <div className="flex items-center gap-3 mb-4">
//               <span className="text-xl text-red-600 font-bold">
//                 {currency(product.price)}
//               </span>
//               <span className="text-gray-500 line-through">
//                 {currency(oldPrice)}
//               </span>
//               <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                 {Math.round(discount)}% OFF
//               </span>
//             </div>

//             {/* Stock */}
//             {product.stock > 0 ? (
//               <p className="text-green-600 font-normal mb-2 bg-green-100 inline px-2 py-0 rounded-2xl">
//                 In stock
//               </p>
//             ) : (
//               <p className="text-red-600 font-normal mb-2 bg-red-100 inline px-2 py-0 rounded-2xl">
//                 Out of stock
//               </p>
//             )}

//             <p className="text-gray-700 leading-relaxed mb-6 mt-6">
//               {product.description}
//             </p>

//             {/* RAM */}
//             {isElectronics && (
//               <div className="mb-5">
//                 <div className="flex items-center gap-8">
//                   <h3 className="font-semibold mb-2 text-gray-900">RAM:</h3>
//                   <div className="flex gap-2 flex-wrap">
//                     {ramOptions.map(ram => (
//                       <button
//                         key={ram}
//                         onClick={() => setSelectedRam(ram)}
//                         className={`px-2 py-1 rounded-lg text-gray-700 border transition ${
//                           selectedRam === ram
//                             ? 'bg-blue-600 text-white border-blue-600'
//                             : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
//                         }`}
//                       >
//                         {ram}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Size */}
//             {isClothing && (
//               <div className="mb-5">
//                 <h3 className="font-semibold mb-2">Select Size:</h3>
//                 <div className="flex gap-2 flex-wrap">
//                   {sizeOptions.map(size => (
//                     <button
//                       key={size}
//                       onClick={() => setSelectedSize(size)}
//                       className={`px-4 py-2 rounded-lg border transition ${
//                         selectedSize === size
//                           ? 'bg-green-600 text-white border-green-600'
//                           : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Quantity + Add to Cart + Wishlist/Compare */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
//             {/* Quantity */}
//             <div className="flex items-center gap-2 px-3 py-1">
//               <button
//                 onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
//                 className="px-3 py-1 bg-gray-200 hover:text-white hover:bg-red-600 text-xl rounded-full"
//               >
//                 -
//               </button>
//               <span className="px-3 font-semibold">{quantity}</span>
//               <button
//                 onClick={() => setQuantity(prev => prev + 1)}
//                 className="px-3 py-1 text-xl bg-gray-200 hover:text-white hover:bg-green-600 rounded-full"
//               >
//                 +
//               </button>
//             </div>

//             {/* Add to Cart */}
//             <button
//               className="flex items-center gap-2 sm:flex-none bg-pink-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-900 transition"
//               onClick={() => toast.error('Please Login to continue')}
//             >
//               <FaShoppingCart /> Add to Cart
//             </button>

//             {/* Wishlist & Compare */}
//             <div className="flex gap-2">
//               {/* Wishlist */}
//               <div className="relative group">
//                 <button
//                   className="flex items-center gap-1 px-4 py-2 border rounded-full hover:bg-pink-100 text-pink-600"
//                   onClick={() => toast.error('Please Login to continue')}
//                 >
//                   <Heart size={16} />
//                 </button>
//                 <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-600 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
//                   Add to Wishlist
//                 </span>
//               </div>

//               {/* Compare */}
//               <div className="relative group">
//                 <button
//                   className="flex items-center gap-1 px-4 py-2 border rounded-full hover:bg-gray-100 text-gray-600"
//                   onClick={() => toast.error('Please Login to continue')}
//                 >
//                   <Shuffle size={16} />
//                 </button>
//                 <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-600 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
//                   Add to Compare
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Tabs */}
//       <div className="mt-10">
//         <ProductTabs
//           description={product.description}
//           additionalInfo={additionalInfo}
//           reviews={reviews}
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//         />
//       </div>
//       {/*  Related Products Section */}
//       <RelatedProducts
//         category={product.category}
//         currentProductId={product.id}
//       />
//     </div>
//   );
// }

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Heart, Shuffle, Star } from 'lucide-react';
import { currency } from '../../utils/currency';
import ZoomableImage from '../ZoomableImage/ZoomableImage';
import ProductTabs from './ProductTabs';
import RelatedProducts from '../ProductDetails/RelatedProducts/RelatedProducts';
import { FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedRam, setSelectedRam] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);

  const ramOptions = ['4GB', '6GB', '8GB', '12GB'];
  const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.thumbnail);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="w-12 h-12 border-4 border-gray-300 border-b-blue-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product)
    return <p className="p-6 text-center my-64">Product not found...</p>;

  const isElectronics =
    product.category === 'smartphones' || product.category === 'laptops';
  const isClothing =
    product.category === 'mens-shirts' ||
    product.category === 'womens-dresses' ||
    product.category === 'tops';

  const discount =
    product.discountPercentage ?? Math.floor(Math.random() * 20) + 5;
  const oldPrice = (product.price / (1 - discount / 100)).toFixed(0);

  // Extra Info
  const additionalInfo = [
    { label: 'Brand', value: product.brand || 'N/A' },
    { label: 'Category', value: product.category || 'N/A' },
    { label: 'Stock', value: product.stock || 'N/A' },
    { label: 'Warranty', value: '1 Year Official Warranty' },
  ];

  // Dummy Reviews
  const reviews = [
    {
      user: 'Hemant Kumar',
      date: '2025-08-30',
      comment: 'Great product!',
      rating: 4.3,
    },
    {
      user: 'Pritam Awatade',
      date: '2024-11-02',
      comment: 'Average quality.',
      rating: 3,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white rounded-2xl shadow-md p-5 sm:p-7">
        {/* Left: Images */}
        <div>
          <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-center">
            <ZoomableImage
              src={selectedImage}
              alt={product.title}
              className="w-full h-[300px] sm:h-[380px] object-contain rounded-lg"
            />
          </div>
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {[product.thumbnail, ...(product.images || [])].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                className={`w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg border cursor-pointer transition-all duration-200 ${
                  img === selectedImage
                    ? 'border-pink-600 shadow-md'
                    : 'border-gray-300 hover:opacity-80'
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">
              {product.title}
            </h1>

            {/* Brand & Rating */}
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-black">Brand: </span>
                {product.brand}
              </p>
              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
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
              <button
                onClick={() => setActiveTab('reviews')}
                className="text-gray-400 hover:text-pink-600 transition text-sm"
              >
                {reviews.length} Reviews
              </button>
            </div>

            {/* Price & Discount */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-xl sm:text-2xl text-red-600 font-bold">
                {currency(product.price)}
              </span>
              <span className="text-gray-500 line-through">
                {currency(oldPrice)}
              </span>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {Math.round(discount)}% OFF
              </span>
            </div>

            {/* Stock */}
            {product.stock > 0 ? (
              <p className="text-green-600 font-sans mb-2 bg-green-100 inline px-2 py-1 rounded-2xl">
                In stock
              </p>
            ) : (
              <p className="text-red-600 font-normal mb-2 bg-red-100 inline px-2 py-0 rounded-2xl">
                Out of stock
              </p>
            )}

            <p className="text-gray-700 leading-relaxed mb-6 mt-6 text-sm sm:text-base">
              {product.description}
            </p>

            {/* RAM */}
            {isElectronics && (
              <div className="">
                <h3 className="font-semibold mb-2 text-gray-900">RAM:</h3>
                <div className="flex gap-2 flex-wrap">
                  {ramOptions.map(ram => (
                    <button
                      key={ram}
                      onClick={() => setSelectedRam(ram)}
                      className={`px-3 py-1 rounded-lg text-sm border transition ${
                        selectedRam === ram
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {ram}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {isClothing && (
              <div className="">
                <h3 className="font-semibold mb-2">Select Size:</h3>
                <div className="flex gap-2 flex-wrap">
                  {sizeOptions.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg text-sm border transition ${
                        selectedSize === size
                          ? 'bg-green-600 text-white border-green-600'
                          : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quantity + Add to Cart + Wishlist/Compare */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
            {/* Quantity */}
            <div className="flex items-center gap-2 px-3 py-1">
              <button
                onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                className="px-3 py-1 bg-gray-200 hover:text-white hover:bg-red-600 text-xl rounded-full"
              >
                -
              </button>
              <span className="px-3 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-1 text-xl bg-gray-200 hover:text-white hover:bg-green-600 rounded-full"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-5">
              {/* Add to Cart */}
              <button
                className="flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-900 transition w-fit sm:w-auto justify-center text-[13px] md:text-[15px]"
                onClick={() => toast.error('Please Login to continue')}
              >
                <FaShoppingCart /> Add to Cart
              </button>

              {/* Wishlist & Compare */}
              <div className="flex gap-2">
                <div className="relative group">
                  <button
                    className="flex items-center gap-1 px-4 py-2 border rounded-full hover:bg-pink-100 text-pink-600"
                    onClick={() => toast.error('Please Login to continue')}
                  >
                    <Heart size={14} />
                  </button>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-600 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    Add to Wishlist
                  </span>
                </div>

                <div className="relative group">
                  <button
                    className="flex items-center gap-1 px-4 py-2 border rounded-full hover:bg-gray-100 text-gray-600"
                    onClick={() => toast.error('Please Login to continue')}
                  >
                    <Shuffle size={14} />
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

      {/* Bottom Tabs */}
      <div className="mt-10">
        <ProductTabs
          description={product.description}
          additionalInfo={additionalInfo}
          reviews={reviews}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={product.category}
        currentProductId={product.id}
      />
    </div>
  );
}
