// import React, { useRef } from 'react';
// import { ChevronRight } from 'lucide-react';

// const NavbarLinksScrollable = ({ navLinks }) => {
//   const navRef = useRef();

//   const scrollRight = () => {
//     navRef.current.scrollBy({ left: 200, behavior: 'smooth' });
//   };

//   return (
//     <div className="relative flex items-center">
//       {/* Scrollable nav links */}
//       <div
//         ref={navRef}
//         className="flex gap-4 lg:gap-11 text-sm font-medium overflow-x-auto scrollbar-hide whitespace-nowrap scroll-smooth"
//       >
//         {navLinks.map((link, idx) => (
//           <div key={idx} className="relative group flex-shrink-0">
//             <a
//               href="#"
//               className="flex items-center gap-2 hover:text-purple-700 transition"
//             >
//               <img
//                 src={link.icon}
//                 alt={link.name}
//                 className="w-4 h-4 object-contain"
//               />
//               {link.name}
//             </a>

//             {/* Submenu */}
//             {link.sub.length > 0 && (
//               <div
//                 className="absolute top-7 left-0 w-47 py-2 bg-white shadow-lg border border-gray-200
//                   opacity-0 translate-y-2 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
//                   transition-all duration-500 ease-in-out font-normal"
//               >
//                 {link.sub.map((subItem, i) => (
//                   <a
//                     key={i}
//                     href="#"
//                     className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
//                   >
//                     {subItem}
//                   </a>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Right arrow button */}
//       <button
//         onClick={scrollRight}
//         className="absolute right-0 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
//       >
//         <ChevronRight size={20} />
//       </button>
//     </div>
//   );
// };

// export default NavbarLinksScrollable;
// ------------------------

// import React, { useEffect, useState } from 'react';
// import {
//   ChevronDown,
//   ChevronUp,
//   Menu,
//   Search,
//   ShoppingBag,
// } from 'lucide-react';
// import SearchPopup from '../Popup/SearchPopup';
// import { Link } from 'react-router-dom';

// const categories = [
//   { name: 'Fashion', sub: ['Men', 'Women'], icon: '/image/fash.png' },
//   {
//     name: 'Electronics',
//     sub: ['Laptops', 'Smart Watch Accessories', 'Cameras'],
//     icon: '/image/ele.png',
//   },
//   { name: 'Bags', sub: ['Men Bags', 'Women Bags'], icon: '/image/bag.png' },
//   {
//     name: 'Footwear',
//     sub: ['Men Footwear', 'Women Footwear'],
//     icon: '/image/foot.png',
//   },
//   { name: 'Groceries', sub: [], icon: '/image/gro.png' },
//   { name: 'Beauty', sub: [], icon: '/image/beauty.png' },
//   { name: 'Wellness', sub: [], icon: '/image/well.png' },
//   { name: 'Jewellery', sub: [], icon: '/image/jw.png' },
// ];

// const navLinks = [
//   {
//     name: 'FASHION',
//     icon: '/image/fash.png',
//     sub: ['Men', 'Women', 'Kids'],
//   },
//   {
//     name: 'ELECTRONICS',
//     icon: '/image/ele.png',
//     sub: ['Laptops', 'Smart Watch Accessories', 'Cameras'],
//   },
//   {
//     name: 'BAGS',
//     icon: '/image/bag.png',
//     sub: ['Men Bags', 'Women Bags'],
//   },
//   {
//     name: 'FOOTWEAR',
//     icon: '/image/foot.png',
//     sub: ['Men Footwear', 'Women Footwear'],
//   },
//   { name: 'GROCERIES', icon: '/image/gro.png', sub: [] },
//   { name: 'BEAUTY', icon: '/image/beauty.png', sub: [] },
//   { name: 'WELLNESS', icon: '/image/well.png', sub: [] },
// ];

// const Navbar = () => {
//   const [location, setLocation] = useState('');
//   const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [showTop, setShowTop] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   const controlNavbar = () => {
//     if (window.scrollY > lastScrollY) {
//       // Scroll Down → hide top
//       setShowTop(false);
//     } else {
//       // Scroll Up → show top
//       setShowTop(true);
//     }
//     setLastScrollY(window.scrollY);
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', controlNavbar);
//     return () => window.removeEventListener('scroll', controlNavbar);
//   }, [lastScrollY]);

//   return (
//     <header className="w-full border-b border-gray-200 bg-white">
//       {/* Top Alert */}
//       <div className="bg-color text-white text-sm py-1 text-center">
//         Due to the <span className="font-semibold">COVID-19</span> epidemic,
//         orders may be processed with a slight delay
//       </div>

//       <div className="container mx-auto px-4">
//         {/* Main Navbar */}
//         <div className="flex items-center justify-between py-3">
//           <div className="flex items-center gap-4 lg:gap-6 flex-1">
//             <Link to={'/'}>
//               <img
//                 src="/logo.jpg"
//                 alt="Logo"
//                 className="w-fit h-fit object-cover rounded-full"
//               />
//             </Link>

//             <SearchPopup />

//             <div className="relative flex-1">
//               <input
//                 type="text"
//                 placeholder="Search for products..."
//                 className="border rounded-md px-4 py-2 w-full focus:ring-1 focus:ring-purple-600 focus:outline-none bg-gray-200 border-gray-200 "
//               />
//               <Search
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                 size={18}
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-4 ml-11">
//             <button className="bg-color text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-800 transition">
//               Sign In
//             </button>
//             <div className="relative">
//               <ShoppingBag size={22} />
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                 0
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Categories & Nav Links */}

//         <div className="flex items-center gap-18 my-4 relative">
//           {/* Categories Button */}
//           <div className="relative">
//             <button
//               onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
//               className="bg-color text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-purple-800 transition"
//             >
//               <Menu size={18} />
//               ALL CATEGORIES
//               <ChevronDown
//                 className={`w-4 h-4 transform transition-transform duration-300 ${
//                   isCategoriesOpen ? 'rotate-180' : ''
//                 }`}
//               />
//             </button>

//             {/* Dropdown */}
//             <div
//               className={`absolute top-13 left-0 w-56 border border-gray-200 rounded shadow-lg bg-white z-10
//       transition-all duration-300 ease-in-out transform
//       ${
//         isCategoriesOpen
//           ? 'opacity-100 translate-y-0 visible'
//           : 'opacity-0 translate-y-2 invisible'
//       }`}
//             >
//               {categories.map((cat, index) => (
//                 <div
//                   key={index}
//                   onMouseEnter={() => setActiveCategory(cat)}
//                   onMouseLeave={() => setActiveCategory(null)}
//                   className="relative group"
//                 >
//                   <div className="px-4 py-2 cursor-pointer hover:text-purple-700 transition flex items-center gap-2">
//                     {cat.icon && (
//                       <img
//                         src={cat.icon}
//                         alt={cat.name}
//                         className="w-5 h-5 object-contain"
//                       />
//                     )}
//                     {cat.name}
//                   </div>

//                   {/* Submenu */}
//                   {cat.sub.length > 0 && activeCategory?.name === cat.name && (
//                     <div
//                       className="absolute top-0 left-full w-56 py-2 bg-white shadow-lg border border-gray-200
//                      transition-all duration-300 ease-in-out transform opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 "
//                     >
//                       {cat.sub.map((sub, idx) => (
//                         <div
//                           key={idx}
//                           className="px-4 py-2 cursor-pointer whitespace-nowrap hover:text-purple-700 transition"
//                         >
//                           {sub}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Nav Links */}
//           <nav className="flex-1 flex gap-4 lg:gap-11 text-sm font-medium z-10 ">
//             {navLinks.map((link, idx) => (
//               <div key={idx} className="relative group">
//                 <a
//                   href="#"
//                   className="flex items-center gap-2 whitespace-nowrap hover:text-purple-700 transition"
//                 >
//                   <img
//                     src={link.icon}
//                     alt={link.name}
//                     className="w-4 h-4 object-contain"
//                   />
//                   {link.name}
//                 </a>

//                 {/* Submenu */}
//                 {link.sub.length > 0 && (
//                   <div
//                     className="absolute top-7 left-0 w-47 py-2 bg-white shadow-lg border border-gray-200
//                       opacity-0 translate-y-2 invisible group-hover:visible group-hover:opacity-100  group-hover:translate-y-0
//                       transition-all duration-500 ease-in-out font-normal"
//                   >
//                     {link.sub.map((subItem, i) => (
//                       <a
//                         key={i}
//                         href="#"
//                         className="block px-4 py-2  hover:bg-gray-100 whitespace-nowrap"
//                       >
//                         {subItem}
//                       </a>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// dlt hobe sob-------------------
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

// // Default banner images (replace with your own if you want)
// const DEFAULT_BANNERS = [
//   'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
//   'https://images.unsplash.com/photo-1512914890250-393dfbd7f72f?q=80&w=1200&auto=format&fit=crop',
// ];

// // Helper: format price
// const currency = n => `৳ ${Number(n).toLocaleString('en-US')}`;

// // Product Card
// const ProductCard = ({ p }) => {
//   const discount = p.discountPercentage ?? Math.floor(Math.random() * 20) + 5; // dummyjson already has it for many
//   const oldPrice = (p.price / (1 - discount / 100)).toFixed(0);
//   const rating = p.rating ?? 4.2;
//   return (
//     <div className="group relative rounded-2xl border bg-white p-3 shadow-sm hover:shadow-md transition-all">
//       <div className="absolute left-2 top-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
//         {Math.round(discount)}%
//       </div>
//       <div className="h-40 w-full overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
//         {/* product image */}
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

// // Left sticky banners with looping vertical auto-scroll
// const StickyBanners = ({ banners = DEFAULT_BANNERS }) => {
//   // create an infinite vertical marquee by duplicating banners
//   const list = useMemo(() => [...banners, ...banners], [banners]);
//   return (
//     <div className="sticky top-6 hidden xl:block">
//       <div className="relative w-[260px] select-none overflow-hidden rounded-2xl">
//         {/* auto-scroll container */}
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
//       {/* Tailwind plugin: add keyframes in inline style */}
//       <style>{`
//         @keyframes scrollUp {
//           0% { transform: translateY(0); }
//           100% { transform: translateY(-50%); }
//         }
//       `}</style>
//     </div>
//   );
// };

// // Horizontal scroller with arrows (first section)
// const HScroller = ({ children }) => {
//   const trackRef = useRef(null);
//   const scrollBy = dir => {
//     const el = trackRef.current;
//     if (!el) return;
//     const amount = el.clientWidth * 0.9;
//     el.scrollBy({ left: dir * amount, behavior: 'smooth' });
//   };
//   return (
//     <div className="relative">
//       <button
//         aria-label="Prev"
//         onClick={() => scrollBy(-1)}
//         className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow p-2 hover:shadow-md hidden md:inline-flex"
//       >
//         <ChevronLeft />
//       </button>
//       <div
//         ref={trackRef}
//         className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-2 no-scrollbar"
//       >
//         {children}
//       </div>
//       <button
//         aria-label="Next"
//         onClick={() => scrollBy(1)}
//         className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow p-2 hover:shadow-md hidden md:inline-flex"
//       >
//         <ChevronRight />
//       </button>
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

// // Fetch hook for DummyJSON per category
// const useCategoryProducts = active => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     let dead = false;
//     const load = async () => {
//       try {
//         setLoading(true);
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

// export default function EcommerceHome() {
//   const [active, setActive] = useState('Fashion');
//   const { data: products, loading } = useCategoryProducts(active);

//   const [banners] = useState(DEFAULT_BANNERS);

//   return (
//     <div className="min-h-screen w-full bg-gray-50">
//       {/* Header */}
//       <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3">
//           <div className="text-xl font-bold">E-Shop</div>
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
//         {/* Left sticky banners */}
//         <StickyBanners banners={banners} />

//         {/* Right: product sections */}
//         <div className="space-y-8">
//           {/* Category pills for mobile */}
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

//           {/* Popular/First row with arrows */}
//           <section>
//             <div className="mb-3 flex items-end justify-between">
//               <div>
//                 <h2 className="text-lg font-bold">POPULAR PRODUCTS</h2>
//                 <p className="text-xs text-gray-500">
//                   Do not miss the current offers until the end of March.
//                 </p>
//               </div>
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

//       {/* footer */}
//       <footer className="border-t bg-white">
//         <div className="mx-auto max-w-7xl px-3 py-6 text-center text-sm text-gray-500">
//           © 2025 E‑Shop demo with Fake API
//         </div>
//       </footer>

//       {/* hide scrollbar utility */}
//       <style>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );
// }

// // ------------------------------

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { CATEGORIES } from '../config/categoryMap';
// import { useCategoryProducts } from '../hooks/useCategoryProducts';

// import ProductCard from '../Product/ProductCard';
// import SkeletonCard from '../Product/SkeletonCard';
// import HScroller from '../Scroller/HScroller';
// import CategoryPills from '../Categories/CategoryPills';

// export default function EcommerceHome() {
//   const [activeCategory, setActiveCategory] = useState('Fashion');
//   const { data: products, loading } = useCategoryProducts(activeCategory);

//   return (
//     <div className="min-h-screen w-full bg-gray-50">
//       {/* Body with Banner + Products side by side */}
//       <div className="mx-auto max-w-7xl py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Left Banner */}
//         <aside className="lg:col-span-1">
//           <div className="sticky top-24 space-y-5">
//             <img
//               src="/ads1.jpg"
//               alt="Banner Ads"
//               className="w-full h-auto object-cover rounded-lg shadow"
//             />
//             <img
//               src="/ads2.jpg"
//               alt="Banner Ads"
//               className="w-full h-auto object-cover rounded-lg shadow"
//             />
//           </div>
//         </aside>

//         {/* Right Product Area */}
//         <div className="lg:col-span-3 space-y-12 px-3">
//           {/* Popular Products Section */}
//           <section>
//             <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between px-2 py-3">
//                 {/* Left side title */}
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-800">
//                     POPULAR PRODUCTS
//                   </h2>
//                   <p className="text-sm text-gray-500">
//                     Do not miss the current offers until the end of March.
//                   </p>
//                 </div>

//                 {/* Right side categories */}
//                 <div className="mt-3 md:mt-0 flex flex-wrap gap-2">
//                   <CategoryPills
//                     categories={CATEGORIES}
//                     active={activeCategory}
//                     onClick={setActiveCategory}
//                   />
//                 </div>
//               </div>
//             </header>

//             <div className="mb-4 text-sm font-semibold text-gray-700 hidden md:block">
//               {activeCategory}
//             </div>

//             {loading ? (
//               <div className="grid grid-flow-col auto-cols-[70%] gap-4 md:auto-cols-[280px]">
//                 {Array.from({ length: 6 }).map((_, i) => (
//                   <SkeletonCard key={i} />
//                 ))}
//               </div>
//             ) : (
//               <HScroller>
//                 {products.slice(0, 10).map(p => (
//                   <div key={p.id} className="snap-start w-[80%] md:w-[280px]">
//                     <ProductCard product={p} />
//                   </div>
//                 ))}
//               </HScroller>
//             )}
//           </section>

//           {/* New Products Grid */}
//           <section>
//             <div className="mb-4">
//               <h2 className="text-xl font-bold text-gray-800">NEW PRODUCTS</h2>
//               <p className="text-sm text-gray-500">
//                 New products with updated stocks.
//               </p>
//             </div>

//             {loading ? (
//               <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//                 {Array.from({ length: 8 }).map((_, i) => (
//                   <SkeletonCard key={i} />
//                 ))}
//               </div>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
//               >
//                 {products.slice(0, 12).map(p => (
//                   <ProductCard key={p.id} product={p} />
//                 ))}
//               </motion.div>
//             )}
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }
