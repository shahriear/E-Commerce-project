import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Search, ShoppingBag } from 'lucide-react';
import SearchPopup from '../Popup/SearchPopup';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Fashion', sub: ['Men', 'Women'], icon: '/image/fash.png' },
  {
    name: 'Electronics',
    sub: ['Laptops', 'Smart Watch Accessories', 'Cameras'],
    icon: '/image/ele.png',
  },
  { name: 'Bags', sub: ['Men Bags', 'Women Bags'], icon: '/image/bag.png' },
  {
    name: 'Footwear',
    sub: ['Men Footwear', 'Women Footwear'],
    icon: '/image/foot.png',
  },
  { name: 'Groceries', sub: [], icon: '/image/gro.png' },
  { name: 'Beauty', sub: [], icon: '/image/beauty.png' },
  { name: 'Wellness', sub: [], icon: '/image/well.png' },
  { name: 'Jewellery', sub: [], icon: '/image/jw.png' },
];

const navLinks = [
  { name: 'FASHION', icon: '/image/fash.png', sub: ['Men', 'Women', 'Kids'] },
  {
    name: 'ELECTRONICS',
    icon: '/image/ele.png',
    sub: ['Laptops', 'Smart Watch Accessories', 'Cameras'],
  },
  { name: 'BAGS', icon: '/image/bag.png', sub: ['Men Bags', 'Women Bags'] },
  {
    name: 'FOOTWEAR',
    icon: '/image/foot.png',
    sub: ['Men Footwear', 'Women Footwear'],
  },
  { name: 'GROCERIES', icon: '/image/gro.png', sub: [] },
  { name: 'BEAUTY', icon: '/image/beauty.png', sub: [] },
  { name: 'WELLNESS', icon: '/image/well.png', sub: [] },
];

const Navbar = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const [showMain, setShowMain] = useState(true);
  const lastScrollY = useRef(0); // useRef avoids re-renders
  const threshold = 100;

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY.current) {
      // scroll down → hide
      setShowMain(false);
    } else {
      // scroll up → show only if near top
      if (window.scrollY < threshold) {
        setShowMain(true);
      }
    }
    lastScrollY.current = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, []);

  return (
    <header
      className={`w-full border-b border-gray-200 bg-white sticky top-0 z-50 transition-transform duration-300 ${
        showMain ? 'translate-y-0' : '-translate-y-24'
      }`}
    >
      {/* Main Navbar */}
      <div
        className={`bg-white transition-transform duration-300 ${
          showMain ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Top Alert */}

        <div className="bg-color text-white text-sm py-1 text-center">
          Due to the <span className="font-semibold">COVID-19</span>
          epidemic, orders may be processed with a slight delay
        </div>
        <div className="container mx-auto px-4 flex items-center justify-between py-3">
          <div className="flex items-center gap-4 lg:gap-6 flex-1">
            <Link to={'/'}>
              <img
                src="/logo.jpg"
                alt="Logo"
                className="w-fit h-fit object-cover rounded-full"
              />
            </Link>
            <SearchPopup />
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search for products..."
                className="border rounded-md px-4 py-2 w-full focus:ring-1 focus:ring-purple-600 focus:outline-none bg-gray-200 border-gray-200"
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-11">
            <button className="bg-color text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-800 transition">
              Sign In
            </button>
            <div className="relative">
              <ShoppingBag size={22} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories & Nav Links (sticky) */}
      <div className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300 pb-2">
        <div className="container mx-auto px-4 flex items-center gap-18 py-3">
          {/* Categories Button */}
          <div className="relative">
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="bg-color text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-purple-800 transition"
            >
              <Menu size={18} />
              ALL CATEGORIES
              <ChevronDown
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  isCategoriesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown */}
            <div
              className={`absolute top-12 left-0 w-56 border border-gray-200 rounded shadow-lg bg-white z-10 transition-all duration-300 ease-in-out transform ${
                isCategoriesOpen
                  ? 'opacity-100 translate-y-0 visible'
                  : 'opacity-0 translate-y-2 invisible'
              }`}
            >
              {categories.map((cat, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setActiveCategory(cat)}
                  onMouseLeave={() => setActiveCategory(null)}
                  className="relative group"
                >
                  <div className="px-4 py-2 cursor-pointer hover:text-purple-700 transition flex items-center gap-2">
                    {cat.icon && (
                      <img
                        src={cat.icon}
                        alt={cat.name}
                        className="w-5 h-5 object-contain"
                      />
                    )}
                    {cat.name}
                  </div>
                  {/* Submenu */}
                  {cat.sub.length > 0 && activeCategory?.name === cat.name && (
                    <div className="absolute  top-0 left-full w-56 py-2 bg-white shadow-lg border border-gray-200 transition-all duration-300 ease-in-out transform opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                      {cat.sub.map((sub, idx) => (
                        <div
                          key={idx}
                          className="px-4 py-2 cursor-pointer whitespace-nowrap hover:text-purple-700 transition"
                        >
                          {sub}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 flex gap-4 lg:gap-11 text-sm font-medium z-10">
            {navLinks.map((link, idx) => (
              <div key={idx} className="relative group">
                <Link
                  to={link.name === 'FASHION' ? '/category' : '/category'} // এখানে তোমার route বসাও
                  className="flex items-center gap-2 whitespace-nowrap hover:text-purple-700 rounded-full hover:bg-gray-200 px-3 py-2 transition"
                >
                  <img
                    src={link.icon}
                    alt={link.name}
                    className="w-4 h-4 object-contain"
                  />
                  {link.name}
                </Link>

                {link.sub.length > 0 && (
                  <div className="absolute top-11 left-0 w-48 py-2 bg-white shadow-lg border border-gray-200 opacity-0 translate-y-2 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out font-normal">
                    {link.sub.map((subItem, i) => (
                      <Link
                        key={i}
                        to={`/category?sub=${subItem}`} //  সাবক্যাটেগরি query param
                        className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* {navLinks.map((link, idx) => (
              <div key={idx} className="relative group">
                <Link
                  to={'/category'}
                  href="#"
                  className="flex items-center gap-2 whitespace-nowrap hover:text-purple-700  rounded-full hover:bg-gray-200 px-3 py-2 transition"
                >
                  <img
                    src={link.icon}
                    alt={link.name}
                    className="w-4 h-4 object-contain"
                  />
                  {link.name}
                </Link>

                {link.sub.length > 0 && (
                  <div className="absolute top-11 left-0 w-48 py-2 bg-white shadow-lg border border-gray-200 opacity-0 translate-y-2 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out font-normal">
                    {link.sub.map((subItem, i) => (
                      <a
                        key={i}
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))} */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

// import React, { useEffect, useRef, useState } from 'react';
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
//   const [showMain, setShowMain] = useState(true);
//   const lastScrollY = useRef(0); // useRef avoids re-renders
//   const threshold = 100;

//   const controlNavbar = () => {
//     if (window.scrollY > lastScrollY.current) {
//       // scroll down → hide
//       setShowMain(false);
//     } else {
//       // scroll up → show only if near top
//       if (window.scrollY < threshold) {
//         setShowMain(true);
//       }
//     }
//     lastScrollY.current = window.scrollY;
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', controlNavbar);
//     return () => window.removeEventListener('scroll', controlNavbar);
//   }, []);

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
