// import React, { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';

// const SingleFeaturedSlider = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // const res = await fetch('https://dummyjson.com/products?limit=10');
//         const res = await fetch('https://dummyjson.com/products');

//         const data = await res.json();
//         setProducts(data.products || []);
//       } catch (error) {
//         console.error('Error fetching featured products:', error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <div className="border rounded-lg p-3 bg-white mt-4">
//       <h3 className="text-md font-semibold mb-2">Special Pick</h3>

//       <Swiper
//         modules={[Navigation]}
//         navigation
//         slidesPerView={1} // ✅ একবারে ১টা product
//         className="w-full"
//       >
//         {products.map(product => (
//           <SwiperSlide key={product.id}>
//             <div className="flex flex-col items-center text-center">
//               <img
//                 src={product.thumbnail}
//                 alt={product.title}
//                 className="w-24 h-24 object-cover rounded mb-2"
//               />
//               <h4 className="text-sm font-medium">{product.title}</h4>
//               <p className="text-purple-600 font-semibold mt-1">
//                 ${product.price}
//               </p>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default SingleFeaturedSlider;
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../../Product/ProductCard';

const SingleFeaturedSlider = () => {
  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };
    fetchProducts();
  }, []);

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrent(prev => (prev - 1 + products.length) % products.length);
  };

  if (products.length === 0) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="relative overflow-hidden w-full py-4">
      {/* Title */}
      <h3 className="text-md font-semibold mb-2 px-2">FEATURED PRODUCTS</h3>

      {/* Slider wrapper */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {products.map(product => (
          <div
            key={product.id}
            className="flex-shrink-0 w-full flex justify-start" // Left aligned
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Left Arrow inside card */}
      <button
        onClick={prevSlide}
        className="absolute left-1 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-1 hover:bg-gray-100 z-10"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Right Arrow inside card */}
      <button
        onClick={nextSlide}
        className="absolute right-28 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-1 hover:bg-gray-100 z-10"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

export default SingleFeaturedSlider;
