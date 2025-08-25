import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../config/categoryMap';
import { useCategoryProducts } from '../hooks/useCategoryProducts';
import { useNewProducts } from '../hooks/useNewProducts';

import ProductCard from '../Product/ProductCard';
import SkeletonCard from '../Product/SkeletonCard';
import HScroller from '../Scroller/HScroller';
import CategoryPills from '../Categories/CategoryPills';
import ScrollableCategoryNav from '../ScrollableCategoryNav/ScrollableCategoryNav';
import BannerAds from './BannerAds-popularProduct/BannerAds';

export default function EcommerceHome() {
  const [activeCategory, setActiveCategory] = useState('Fashion');

  const { data: popularProducts, loading: popularLoading } =
    useCategoryProducts(activeCategory);

  const { data: newProducts, loading: newLoading } = useNewProducts();

  return (
    <div className="min-h-screen w-full bg-gray-50 container">
      <div className="mx-auto max-w-8xl py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Banner */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-5">
            <img
              src="/ads1.jpg"
              alt="Banner Ads"
              className="w-[250px] h-auto object-cover rounded-lg shadow"
            />
            <img
              src="/ads2.jpg"
              alt="Banner Ads"
              className="w-[250px] h-auto object-cover rounded-lg shadow"
            />
          </div>
        </aside>

        {/* Right Product  */}
        <div className="lg:col-span-3 space-y-10">
          {/* Mobile Category Pills */}
          <div className="flex flex-wrap gap-2 md:hidden px-2">
            <CategoryPills
              categories={CATEGORIES}
              active={activeCategory}
              onClick={setActiveCategory}
              mobile
            />
          </div>

          {/* Popular Products Section */}
          <section>
            <header className="sticky top-0 z-30 bg-gray-50">
              <div className="flex items-center justify-between px-4 py-3 gap-4">
                <div>
                  <h2 className="text-lg font-bold">POPULAR PRODUCTS</h2>
                  <p className="text-xs text-gray-500">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>
                <div className="flex-1 max-w-[60%]">
                  <ScrollableCategoryNav
                    categories={CATEGORIES}
                    active={activeCategory}
                    onClick={setActiveCategory}
                  />
                </div>
              </div>
            </header>

            <div className="mb-3 flex items-end justify-between">
              <div className="hidden md:block text-sm font-semibold text-gray-700">
                {activeCategory}
              </div>
            </div>

            {popularLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <HScroller visibleItems={5}>
                {popularProducts.map(p => (
                  <motion.div
                    key={p.id}
                    layout
                    whileHover={{ backgroundColor: '#f3f4f6' }}
                    className="snap-start w-[90%] md:w-[280px] p-1 rounded-xl transition-colors duration-200"
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </HScroller>
            )}
          </section>

          {/* New Products Grid */}
          <section>
            <div className="mb-3">
              <h2 className="text-lg font-bold">NEW PRODUCTS</h2>
              <p className="text-xs text-gray-500">
                New products with updated stocks.
              </p>
            </div>

            {newLoading ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
              >
                {newProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </motion.div>
            )}
          </section>
          <BannerAds />
        </div>
      </div>
    </div>
  );
}

// full akbare kora components charai ----------------
// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
// import { motion } from 'framer-motion';

// // ---- CONFIG ----
// const CATEGORY_MAP = {
//   Fashion: 'mens-shirts',
//   Electronics: 'smartphones',
//   Bags: 'womens-bags',
//   Footwear: 'mens-shoes',
//   Groceries: 'groceries',
//   Beauty: 'beauty',
//   Wellness: 'fragrances',
//   Jewellery: 'womens-jewellery',
// };
// const CATEGORIES = Object.keys(CATEGORY_MAP);

// // Default banners
// const DEFAULT_BANNERS = [
//   'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
//   'https://images.unsplash.com/photo-1512914890250-393dfbd7f72f?q=80&w=1200&auto=format&fit=crop',
// ];

// // Helper: format price
// const currency = n => `৳ ${Number(n).toLocaleString('en-US')}`;

// // Product Card
// const ProductCard = ({ p }) => {
//   const discount = p.discountPercentage ?? Math.floor(Math.random() * 20) + 5;
//   const oldPrice = (p.price / (1 - discount / 100)).toFixed(0);
//   const rating = p.rating ?? 4.2;

//   return (
//     <div className="group relative rounded-2xl border bg-white p-3 shadow-sm hover:shadow-md transition-all">
//       <div className="absolute left-2 top-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
//         {Math.round(discount)}%
//       </div>
//       <div className="h-40 w-full overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
//         <img
//           src={p.thumbnail || p.images?.[0]}
//           alt={p.title}
//           className="h-full w-full object-contain group-hover:scale-[1.02] transition duration-300"
//           loading="lazy"
//         />
//       </div>
//       <div className="mt-3 space-y-1">
//         <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 min-h-[40px]">
//           {p.title}
//         </h3>
//         <div className="flex items-center gap-1 text-amber-500 text-xs">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <Star
//               key={i}
//               size={14}
//               fill={i < Math.round(rating) ? 'currentColor' : 'transparent'}
//             />
//           ))}
//           <span className="ml-1 text-gray-500">{rating.toFixed(1)}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="text-red-600 font-bold">{currency(p.price)}</span>
//           <span className="text-gray-400 line-through text-sm">
//             {currency(oldPrice)}
//           </span>
//         </div>
//         <button className="mt-2 w-full rounded-xl bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700">
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// // Sticky left banners with vertical marquee
// const StickyBanners = ({ banners = DEFAULT_BANNERS }) => {
//   const list = useMemo(() => [...banners, ...banners], [banners]);
//   return (
//     <div className="sticky top-6 hidden xl:block">
//       <div className="relative w-[260px] select-none overflow-hidden rounded-2xl">
//         <div className="animate-[scrollUp_12s_linear_infinite]">
//           {list.map((src, i) => (
//             <img
//               key={i}
//               src={src}
//               className="mb-4 h-[320px] w-full rounded-2xl object-cover"
//               alt={`banner-${i}`}
//               loading="lazy"
//             />
//           ))}
//         </div>
//       </div>
//       <style>{`
//         @keyframes scrollUp {
//           0% { transform: translateY(0); }
//           100% { transform: translateY(-50%); }
//         }
//       `}</style>
//     </div>
//   );
// };

// // Horizontal scroller with arrows
// const HScroller = ({ children }) => {
//   const trackRef = useRef(null);
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(false);

//   const updateScrollState = () => {
//     const el = trackRef.current;
//     if (!el) return;
//     setCanScrollLeft(el.scrollLeft > 5);
//     setCanScrollRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 5);
//   };

//   const scrollByAmount = dir => {
//     const el = trackRef.current;
//     if (!el) return;
//     const amount = el.clientWidth * 0.9;
//     el.scrollBy({ left: dir * amount, behavior: 'smooth' });
//   };

//   useEffect(() => {
//     const el = trackRef.current;
//     if (!el) return;

//     updateScrollState(); // initial check
//     el.addEventListener('scroll', updateScrollState);
//     window.addEventListener('resize', updateScrollState);

//     return () => {
//       el.removeEventListener('scroll', updateScrollState);
//       window.removeEventListener('resize', updateScrollState);
//     };
//   }, [children]);

//   return (
//     <div className="relative">
//       {canScrollLeft && (
//         <button
//           aria-label="Prev"
//           onClick={() => scrollByAmount(-1)}
//           className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow p-2 hover:shadow-md"
//         >
//           <ChevronLeft />
//         </button>
//       )}
//       <div
//         ref={trackRef}
//         className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-2 no-scrollbar"
//       >
//         {children}
//       </div>
//       {canScrollRight && (
//         <button
//           aria-label="Next"
//           onClick={() => scrollByAmount(1)}
//           className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow p-2 hover:shadow-md"
//         >
//           <ChevronRight />
//         </button>
//       )}
//     </div>
//   );
// };

// // Skeleton loader
// const Skeleton = () => (
//   <div className="animate-pulse rounded-2xl border p-3">
//     <div className="h-40 w-full rounded-xl bg-gray-200" />
//     <div className="mt-3 h-4 w-3/4 rounded bg-gray-200" />
//     <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
//     <div className="mt-2 h-8 w-full rounded bg-gray-200" />
//   </div>
// );

// // Fetch products per category
// const useCategoryProducts = active => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let dead = false;
//     const load = async () => {
//       setLoading(true);
//       try {
//         const slug = CATEGORY_MAP[active];
//         const res = await fetch(
//           `https://dummyjson.com/products/category/${slug}?limit=16`
//         );
//         const json = await res.json();
//         if (!dead) setData(json.products || []);
//       } catch (e) {
//         console.error(e);
//         if (!dead) setData([]);
//       } finally {
//         if (!dead) setLoading(false);
//       }
//     };
//     load();
//     return () => {
//       dead = true;
//     };
//   }, [active]);

//   return { data, loading };
// };

// // ---- MAIN COMPONENT ----
// export default function EcommerceHome() {
//   const [active, setActive] = useState('Fashion');
//   const { data: products, loading } = useCategoryProducts(active);

//   return (
//     <div className="min-h-screen w-full bg-gray-50">
//       {/* Header */}
//       <header className="sticky top-0 z-30  bg-white/80 backdrop-blur">
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3">
//           <div>
//             <h2 className="text-lg font-bold">POPULAR PRODUCTS</h2>
//             <p className="text-xs text-gray-500">
//               Do not miss the current offers until the end of March.
//             </p>
//           </div>

//           <nav className="hidden gap-3 md:flex">
//             {CATEGORIES.map(c => (
//               <button
//                 key={c}
//                 onClick={() => setActive(c)}
//                 className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
//                   active === c
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {c}
//               </button>
//             ))}
//           </nav>
//         </div>
//       </header>

//       {/* Body */}
//       <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-3 py-6 xl:grid-cols-[260px,1fr]">
//         {/* <StickyBanners banners={DEFAULT_BANNERS} /> */}

//         <div className="space-y-8">
//           {/* Mobile category pills */}
//           <div className="flex flex-wrap gap-2 md:hidden">
//             {CATEGORIES.map(c => (
//               <button
//                 key={c}
//                 onClick={() => setActive(c)}
//                 className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
//                   active === c
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-white text-gray-700 border'
//                 }`}
//               >
//                 {c}
//               </button>
//             ))}
//           </div>

//           {/* Popular products */}
//           <section>
//             <div className="mb-3 flex items-end justify-between">
//               {/* <div>
//                 <h2 className="text-lg font-bold">POPULAR PRODUCTS</h2>
//                 <p className="text-xs text-gray-500">
//                   Do not miss the current offers until the end of March.
//                 </p>
//               </div> */}
//               <div className="hidden md:block text-sm font-semibold text-gray-700">
//                 {active}
//               </div>
//             </div>

//             {loading ? (
//               <div className="grid grid-flow-col auto-cols-[70%] gap-4 md:auto-cols-[280px]">
//                 {Array.from({ length: 6 }).map((_, i) => (
//                   <Skeleton key={i} />
//                 ))}
//               </div>
//             ) : (
//               <HScroller>
//                 {products.slice(0, 10).map(p => (
//                   <div key={p.id} className="snap-start w-[80%] md:w-[280px]">
//                     <ProductCard p={p} />
//                   </div>
//                 ))}
//               </HScroller>
//             )}
//           </section>

//           {/* New products grid */}
//           <section>
//             <div className="mb-3">
//               <h2 className="text-lg font-bold">NEW PRODUCTS</h2>
//               <p className="text-xs text-gray-500">
//                 New products with updated stocks.
//               </p>
//             </div>
//             {loading ? (
//               <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//                 {Array.from({ length: 8 }).map((_, i) => (
//                   <Skeleton key={i} />
//                 ))}
//               </div>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
//               >
//                 {products.slice(0, 12).map(p => (
//                   <ProductCard key={p.id} p={p} />
//                 ))}
//               </motion.div>
//             )}
//           </section>
//         </div>
//       </div>

//       <style>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );
// }
