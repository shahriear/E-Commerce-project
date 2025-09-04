import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Search, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SearchPopup from '../Popup/SearchPopup';

const categories = [
  { name: 'Fashion', sub: ['Man', 'Woman'], icon: '/image/fash.png' },
  {
    name: 'Electronics',
    sub: ['Laptops', 'Accessories'],
    icon: '/image/ele.png',
  },
  { name: 'Bags', sub: ['Man Bags', 'Woman Bags'], icon: '/image/bag.png' },
  {
    name: 'Footwear',
    sub: ['Man Footwear', 'Woman Footwear'],
    icon: '/image/foot.png',
  },
  { name: 'Groceries', sub: [], icon: '/image/gro.png' },
  { name: 'Beauty', sub: [], icon: '/image/beauty.png' },
  { name: 'Wellness', sub: [], icon: '/image/well.png' },
  { name: 'Jewellery', sub: [], icon: '/image/jw.png' },
];

const navLinks = [
  { name: 'Fashion', icon: '/image/fash.png', sub: ['Man', 'Woman'] },
  {
    name: 'Electronics',
    icon: '/image/ele.png',
    sub: ['Laptops', 'Accessories'],
  },
  { name: 'Bags', icon: '/image/bag.png', sub: ['Man Bags', 'Woman Bags'] },
  {
    name: 'Footwear',
    icon: '/image/foot.png',
    sub: ['Man Footwear', 'Woman Footwear'],
  },
  { name: 'Groceries', icon: '/image/gro.png', sub: [] },
  { name: 'Beauty', icon: '/image/beauty.png', sub: [] },
  { name: 'Wellness', icon: '/image/well.png', sub: [] },
  { name: 'Jewellery', icon: '/image/jw.png', sub: [] },
];

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showMain, setShowMain] = useState(true);

  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setShow(false);
      } else if (currentScrollY < lastScrollY && currentScrollY < 300) {
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Hide/show navbar on scroll
  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) setShowMain(false);
    else setShowMain(true);

    setLastScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, []);

  // Nav link click
  const handleNavClick = catName => navigate(`/featured/${catName}`);
  const handleCategoryClick = catName => {
    navigate(`/featured/${catName}`);
    setIsCategoriesOpen(true);
  };

  // Fetch search suggestions
  const fetchSuggestions = async value => {
    try {
      setLoadingSearch(true);
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${value}`
      );
      const data = await res.json();
      setSuggestions(data.products || []);
      setShowSuggestions(true);
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    } finally {
      setLoadingSearch(false);
    }
  };

  // Search input change
  const handleSearchChange = e => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) fetchSuggestions(value);
    else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  // Submit search (Enter press or icon click)
  const handleSearchSubmit = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    try {
      setLoadingSearch(true);
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(
          trimmedQuery
        )}`
      );
      const data = await res.json();

      if (data.products && data.products.length > 0) {
        // ✅ প্রথম প্রোডাক্টের details এ রিডাইরেক্ট করবো
        navigate(`/product/${data.products[0].id}`);
      } else {
        alert('No product found!');
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoadingSearch(false);
      setShowSuggestions(false);
    }
  };

  // Click suggestion
  const handleSuggestionClick = productId => {
    setQuery('');
    setShowSuggestions(false);

    navigate(`/product/${productId}`);
  };
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <header
      className={`w-full border-b border-gray-200 bg-white sticky top-0 z-50 transition-transform duration-300 ${
        show ? 'translate-y-0' : '-translate-y-24'
      }`}
    >
      {/* Top Info */}
      <div className="bg-color text-white text-sm py-1 text-center">
        Due to the <span className="font-semibold">COVID-19</span> epidemic,
        orders may be processed with a slight delay
      </div>

      {/* Logo + Search */}
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
              value={query}
              onChange={handleSearchChange}
              onFocus={() => query.length > 1 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              onKeyDown={handleKeyDown}
            />
            <div
              onClick={handleSearchSubmit}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {loadingSearch ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>
              ) : (
                <Search size={18} />
              )}
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-200 z-20 max-h-60 overflow-y-auto">
                {suggestions.map(item => (
                  <div
                    key={item.id}
                    onClick={() => handleSuggestionClick(item.id)} // ✅ এখন id পাঠাচ্ছি
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sign in + Cart */}
        <div className="flex items-center gap-4 ml-11">
          <button className="bg-color text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-800 transition">
            Sign In
          </button>
          <div className="relative cursor-pointer">
            <ShoppingBag size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </div>
        </div>
      </div>

      {/* Categories & Nav Links */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 flex items-center gap-10 py-3">
          {/* Categories Button */}
          <div className="relative">
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="bg-color text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-purple-800 transition"
            >
              <Menu size={18} /> ALL CATEGORIES
              <ChevronDown
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  isCategoriesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isCategoriesOpen && (
              <div className="absolute top-12 left-0 w-56 border border-gray-200 rounded shadow-lg bg-white z-10">
                {categories.map((cat, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setActiveCategory(cat)}
                    onMouseLeave={() => setActiveCategory(null)}
                    className="relative group"
                  >
                    <div
                      onClick={() => handleCategoryClick(cat.name)}
                      className="px-4 py-2 cursor-pointer hover:text-purple-700 transition flex items-center gap-2"
                    >
                      {cat.icon && (
                        <img
                          src={cat.icon}
                          alt={cat.name}
                          className="w-5 h-5 object-contain"
                        />
                      )}
                      {cat.name}
                    </div>

                    {cat.sub.length > 0 &&
                      activeCategory?.name === cat.name && (
                        <div className="absolute top-0 left-full w-56 py-4 bg-white shadow-lg border border-gray-200">
                          {cat.sub.map((sub, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleCategoryClick(sub)}
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
            )}
          </div>

          {/* Nav Links */}
          <nav className="flex-1 flex gap-4 lg:gap-11 text-sm font-medium z-10">
            {navLinks.map((link, idx) => (
              <div key={idx} className="relative group">
                <div
                  onClick={() => handleNavClick(link.name)}
                  className="flex items-center  whitespace-nowrap hover:text-purple-700 rounded-full hover:bg-gray-200 px-2 py-1.5 transition cursor-pointer text-[px] uppercase"
                >
                  <img
                    src={link.icon}
                    alt={link.name}
                    className="w-4 h-4 object-contain"
                  />
                  <p className="pl-1">{link.name}</p>
                </div>

                {link.sub.length > 0 && (
                  <div className="absolute top-11 left-0 w-48 py-2 bg-white shadow-lg border border-gray-200 opacity-0 translate-y-2 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out font-normal">
                    {link.sub.map((subItem, i) => (
                      <div
                        key={i}
                        onClick={() => handleNavClick(subItem)}
                        className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap cursor-pointer"
                      >
                        {subItem}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
// ---------------------------------------uprer ta main navbar---
// import React, { useEffect, useState } from 'react';
// import { Menu, X, ChevronDown, Search, ShoppingBag } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import SearchPopup from '../Popup/SearchPopup';

// const categories = [
//   { name: 'Fashion', sub: ['Man', 'Woman'], icon: '/image/fash.png' },
//   {
//     name: 'Electronics',
//     sub: ['Laptops', 'Accessories'],
//     icon: '/image/ele.png',
//   },
//   { name: 'Bags', sub: ['Man Bags', 'Woman Bags'], icon: '/image/bag.png' },
//   {
//     name: 'Footwear',
//     sub: ['Man Footwear', 'Woman Footwear'],
//     icon: '/image/foot.png',
//   },
//   { name: 'Groceries', sub: [], icon: '/image/gro.png' },
//   { name: 'Beauty', sub: [], icon: '/image/beauty.png' },
//   { name: 'Wellness', sub: [], icon: '/image/well.png' },
//   { name: 'Jewellery', sub: [], icon: '/image/jw.png' },
// ];

// const navLinks = [
//   { name: 'Fashion', icon: '/image/fash.png', sub: ['Man', 'Woman'] },
//   {
//     name: 'Electronics',
//     icon: '/image/ele.png',
//     sub: ['Laptops', 'Accessories'],
//   },
//   { name: 'Bags', icon: '/image/bag.png', sub: ['Man Bags', 'Woman Bags'] },
//   {
//     name: 'Footwear',
//     icon: '/image/foot.png',
//     sub: ['Man Footwear', 'Woman Footwear'],
//   },
//   { name: 'Groceries', icon: '/image/gro.png', sub: [] },
//   { name: 'Beauty', icon: '/image/beauty.png', sub: [] },
//   { name: 'Wellness', icon: '/image/well.png', sub: [] },
//   { name: 'Jewellery', icon: '/image/jw.png', sub: [] },
// ];

// const Navbar = () => {
//   const [query, setQuery] = useState('');
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);
//   const [loadingSearch, setLoadingSearch] = useState(false);

//   const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
//   const [activeCategory, setActiveCategory] = useState(null);

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const navigate = useNavigate();

//   const [show, setShow] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY > lastScrollY && currentScrollY > 150) {
//         setShow(false);
//       } else if (currentScrollY < lastScrollY && currentScrollY < 300) {
//         setShow(true);
//       }

//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [lastScrollY]);

//   // Hide/show navbar on scroll
//   const controlNavbar = () => {
//     if (window.scrollY > lastScrollY) setShowMain(false);
//     else setShowMain(true);

//     setLastScrollY(window.scrollY);
//   };
//   useEffect(() => {
//     window.addEventListener('scroll', controlNavbar);
//     return () => window.removeEventListener('scroll', controlNavbar);
//   }, []);

//   // --- Search ---
//   const fetchSuggestions = async value => {
//     try {
//       setLoadingSearch(true);
//       const res = await fetch(
//         `https://dummyjson.com/products/search?q=${value}`
//       );
//       const data = await res.json();
//       setSuggestions(data.products || []);
//       setShowSuggestions(true);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoadingSearch(false);
//     }
//   };

//   const handleSearchChange = e => {
//     const value = e.target.value;
//     setQuery(value);
//     if (value.length > 1) fetchSuggestions(value);
//     else {
//       setShowSuggestions(false);
//       setSuggestions([]);
//     }
//   };

//   const handleSearchSubmit = () => {
//     if (!query.trim()) return;
//     navigate(`/featured/${query}`);
//     setShowSuggestions(false);
//   };

//   const handleNavClick = name => {
//     navigate(`/featured/${name}`);
//     setMobileMenuOpen(false); // mobile এ ক্লিক করলে menu বন্ধ হবে
//   };

//   return (
//     <header
//       className={`
//     w-full border-b border-gray-200 bg-white sticky top-0 z-50
//     transition-transform duration-300
//     ${show ? 'lg:translate-y-0' : 'lg:-translate-y-24'}
//     translate-y-
//   `}
//     >
//       {/* Top Info */}
//       <div className="bg-color text-white text-sm py-1 text-center">
//         Due to the <span className="font-semibold">COVID-19</span> epidemic,
//         orders may be delayed
//       </div>

//       {/* Main Navbar */}
//       <div className="container mx-auto px-4 flex items-center justify-between py-3">
//         {/* Left: Logo */}
//         <div className="flex items-center gap-3">
//           {/* Mobile menu button */}
//           <button
//             onClick={() => setMobileMenuOpen(true)}
//             className="lg:hidden p-2 border rounded-md"
//           >
//             <Menu size={22} />
//           </button>

//           <Link to={'/'}>
//             <img
//               src="/logo.jpg"
//               alt="Logo"
//               className="w-10 h-10 object-cover rounded-full"
//             />
//           </Link>
//         </div>

//         {/* Middle: Search */}
//         <div className="hidden md:block flex-1 mx-6 relative">
//           <input
//             type="text"
//             placeholder="Search for products..."
//             className="border rounded-md px-4 py-2 w-full focus:ring-1 focus:ring-purple-600 focus:outline-none bg-gray-200 border-gray-200"
//             value={query}
//             onChange={handleSearchChange}
//           />
//           <div
//             onClick={handleSearchSubmit}
//             className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
//           >
//             {loadingSearch ? (
//               <div className="w-5 h-5 border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>
//             ) : (
//               <Search size={18} />
//             )}
//           </div>
//         </div>

//         {/* Right: Sign in + Cart */}
//         <div className="flex items-center gap-4">
//           <button className="bg-color text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-800 transition hidden md:block">
//             Sign In
//           </button>
//           <div className="relative cursor-pointer">
//             <ShoppingBag size={22} />
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//               0
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Nav Links */}
//       <div className="hidden lg:block bg-white shadow-md">
//         <div className="container mx-auto px-4 flex items-center gap-10 py-3">
//           {/* Categories Button */}
//           <div className="relative">
//             <button
//               onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
//               className="bg-color text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-purple-800 transition"
//             >
//               <Menu size={18} /> ALL CATEGORIES
//               <ChevronDown
//                 className={`w-4 h-4 transform transition-transform duration-300 ${
//                   isCategoriesOpen ? 'rotate-180' : ''
//                 }`}
//               />
//             </button>

//             {isCategoriesOpen && (
//               <div className="absolute top-12 left-0 w-56 border border-gray-200 rounded shadow-lg bg-white z-10">
//                 {categories.map(cat => (
//                   <div
//                     key={cat.name}
//                     onMouseEnter={() => setActiveCategory(cat)}
//                     onMouseLeave={() => setActiveCategory(null)}
//                     className="relative group"
//                   >
//                     <div
//                       onClick={() => handleNavClick(cat.name)}
//                       className="px-4 py-2 cursor-pointer hover:text-purple-700 flex items-center gap-2"
//                     >
//                       <img
//                         src={cat.icon}
//                         alt={cat.name}
//                         className="w-5 h-5 object-contain"
//                       />
//                       {cat.name}
//                     </div>
//                     {cat.sub.length > 0 &&
//                       activeCategory?.name === cat.name && (
//                         <div className="absolute top-0 left-full w-56 py-4 bg-white shadow-lg border">
//                           {cat.sub.map(sub => (
//                             <div
//                               key={sub}
//                               onClick={() => handleNavClick(sub)}
//                               className="px-4 py-2 hover:text-purple-700 cursor-pointer"
//                             >
//                               {sub}
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Nav Links */}
//           <nav className="flex gap-6 text-sm font-medium">
//             {navLinks.map(link => (
//               <div key={link.name} className="relative group">
//                 <div
//                   onClick={() => handleNavClick(link.name)}
//                   className="flex items-center hover:text-purple-700 cursor-pointer px-2 py-1 rounded-full hover:bg-gray-200"
//                 >
//                   <img src={link.icon} alt={link.name} className="w-4 h-4" />
//                   <span className="ml-1">{link.name}</span>
//                 </div>
//                 {link.sub.length > 0 && (
//                   <div className="absolute top-11 left-0 w-48 py-2 bg-white shadow-lg border opacity-0 invisible group-hover:visible group-hover:opacity-100 transition">
//                     {link.sub.map(sub => (
//                       <div
//                         key={sub}
//                         onClick={() => handleNavClick(sub)}
//                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                       >
//                         {sub}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>
//         </div>
//       </div>

//       {/* Mobile Menu Drawer */}
//       {mobileMenuOpen && (
//         <div className="fixed inset-0 bg-black/40 z-50 lg:hidden">
//           <div className="absolute top-0 left-0 w-72 bg-white h-full shadow-lg p-4 overflow-y-auto">
//             {/* Header */}
//             <div className="flex items-center justify-between mb-4">
//               <Link to="/" onClick={() => setMobileMenuOpen(false)}>
//                 <img
//                   src="/logo.jpg"
//                   alt="Logo"
//                   className="w-10 h-10 rounded-full"
//                 />
//               </Link>
//               <button onClick={() => setMobileMenuOpen(false)}>
//                 <X size={22} />
//               </button>
//             </div>

//             {/* Search */}
//             <div className="mb-4 relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="w-full border rounded-md px-3 py-2 bg-gray-100"
//                 value={query}
//                 onChange={handleSearchChange}
//               />
//               <button
//                 onClick={handleSearchSubmit}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//               >
//                 <Search size={18} />
//               </button>
//             </div>

//             {/* Links */}
//             <nav className="flex flex-col gap-2">
//               {navLinks.map(link => (
//                 <div key={link.name}>
//                   <div
//                     onClick={() => handleNavClick(link.name)}
//                     className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                   >
//                     <img src={link.icon} alt={link.name} className="w-5 h-5" />
//                     {link.name}
//                   </div>
//                   {link.sub.length > 0 && (
//                     <div className="ml-6 flex flex-col">
//                       {link.sub.map(sub => (
//                         <div
//                           key={sub}
//                           onClick={() => handleNavClick(sub)}
//                           className="px-3 py-1 text-sm text-gray-600 hover:text-purple-700 cursor-pointer"
//                         >
//                           {sub}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </nav>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;

// -------------------------------------------------

// import React, { useEffect, useState } from 'react';
// import { ChevronDown, Menu, Search, ShoppingBag, X } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import SearchPopup from '../Popup/SearchPopup';

// const categories = [
//   { name: 'Fashion', sub: ['Man', 'Woman'], icon: '/image/fash.png' },
//   {
//     name: 'Electronics',
//     sub: ['Laptops', 'Accessories'],
//     icon: '/image/ele.png',
//   },
//   { name: 'Bags', sub: ['Man Bags', 'Woman Bags'], icon: '/image/bag.png' },
//   {
//     name: 'Footwear',
//     sub: ['Man Footwear', 'Woman Footwear'],
//     icon: '/image/foot.png',
//   },
//   { name: 'Groceries', sub: [], icon: '/image/gro.png' },
//   { name: 'Beauty', sub: [], icon: '/image/beauty.png' },
//   { name: 'Wellness', sub: [], icon: '/image/well.png' },
//   { name: 'Jewellery', sub: [], icon: '/image/jw.png' },
// ];

// const navLinks = [
//   { name: 'Fashion', icon: '/image/fash.png', sub: ['Man', 'Woman'] },
//   {
//     name: 'Electronics',
//     icon: '/image/ele.png',
//     sub: ['Laptops', 'Accessories'],
//   },
//   { name: 'Bags', icon: '/image/bag.png', sub: ['Man Bags', 'Woman Bags'] },
//   {
//     name: 'Footwear',
//     icon: '/image/foot.png',
//     sub: ['Man Footwear', 'Woman Footwear'],
//   },
//   { name: 'Groceries', icon: '/image/gro.png', sub: [] },
//   { name: 'Beauty', icon: '/image/beauty.png', sub: [] },
//   { name: 'Wellness', icon: '/image/well.png', sub: [] },
//   { name: 'Jewellery', icon: '/image/jw.png', sub: [] },
// ];

// const Navbar = () => {
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [loadingSearch, setLoadingSearch] = useState(false);

//   const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
//   const [activeCategory, setActiveCategory] = useState(null);

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

//   const navigate = useNavigate();

//   // Search suggestions fetch
//   const fetchSuggestions = async value => {
//     try {
//       setLoadingSearch(true);
//       const res = await fetch(
//         `https://dummyjson.com/products/search?q=${value}`
//       );
//       const data = await res.json();
//       setSuggestions(data.products || []);
//       setShowSuggestions(true);
//     } catch (err) {
//       console.error(err);
//       setSuggestions([]);
//     } finally {
//       setLoadingSearch(false);
//     }
//   };

//   const handleSearchChange = e => {
//     const value = e.target.value;
//     setQuery(value);
//     if (value.length > 1) fetchSuggestions(value);
//     else {
//       setShowSuggestions(false);
//       setSuggestions([]);
//     }
//   };

//   const handleSearchSubmit = async () => {
//     const trimmedQuery = query.trim();
//     if (!trimmedQuery) return;

//     try {
//       setLoadingSearch(true);
//       const res = await fetch(
//         `https://dummyjson.com/products/search?q=${encodeURIComponent(
//           trimmedQuery
//         )}`
//       );
//       const data = await res.json();
//       if (data.products && data.products.length > 0) {
//         navigate(`/product/${data.products[0].id}`);
//       } else {
//         alert('No product found!');
//       }
//     } catch (err) {
//       console.error('Search error:', err);
//     } finally {
//       setLoadingSearch(false);
//       setShowSuggestions(false);
//     }
//   };

//   const handleKeyDown = e => {
//     if (e.key === 'Enter') handleSearchSubmit();
//   };

//   const handleSuggestionClick = id => {
//     setQuery('');
//     setShowSuggestions(false);
//     navigate(`/product/${id}`);
//   };

//   const handleNavClick = name => navigate(`/featured/${name}`);

//   return (
//     <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
//       {/* Top Info */}
//       <div className="bg-color text-white text-sm py-1 text-center">
//         Due to the <span className="font-semibold">COVID-19</span> epidemic,
//         orders may be processed with a slight delay
//       </div>

//       {/* Logo + Search + Desktop Menu */}
//       <div className="container mx-auto px-4 flex items-center justify-between py-3">
//         {/* Left: Logo */}
//         <div className="flex items-center gap-4 lg:gap-6">
//           <Link to="/">
//             <img
//               src="/logo.jpg"
//               alt="Logo"
//               className="w-12 h-12 object-cover rounded-full"
//             />
//           </Link>

//           {/* Search */}
//           <div className="relative hidden md:flex w-full">
//             <input
//               type="text"
//               placeholder="Search for products..."
//               className="border rounded-md px-4 py-2 w-full focus:ring-1 focus:ring-purple-600 focus:outline-none bg-gray-200 border-gray-200"
//               value={query}
//               onChange={handleSearchChange}
//               onFocus={() => query.length > 1 && setShowSuggestions(true)}
//               onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
//               onKeyDown={handleKeyDown}
//             />
//             <div
//               onClick={handleSearchSubmit}
//               className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
//             >
//               {loadingSearch ? (
//                 <div className="w-5 h-5 border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>
//               ) : (
//                 <Search size={18} />
//               )}
//             </div>

//             {showSuggestions && suggestions.length > 0 && (
//               <div className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-200 z-20 max-h-60 overflow-y-auto">
//                 {suggestions.map(item => (
//                   <div
//                     key={item.id}
//                     onClick={() => handleSuggestionClick(item.id)}
//                     className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   >
//                     <img
//                       src={item.thumbnail}
//                       alt={item.title}
//                       className="w-10 h-10 object-cover rounded"
//                     />
//                     <span>{item.title}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right: Sign in + Cart + Mobile Hamburger */}
//         <div className="flex items-center gap-4">
//           <button className="bg-color text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-800 transition hidden md:block">
//             Sign In
//           </button>
//           <div className="relative cursor-pointer hidden md:block">
//             <ShoppingBag size={22} />
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//               0
//             </span>
//           </div>

//           {/* Mobile Hamburger */}
//           <button
//             className="md:hidden p-2 border rounded"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Desktop Categories & Nav */}
//       <div className="bg-white shadow-md hidden md:block">
//         <div className="container mx-auto px-4 flex items-center gap-10 py-3">
//           {/* Categories */}
//           <div className="relative">
//             <button
//               onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
//               className="bg-color text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-purple-800 transition"
//             >
//               <Menu size={18} /> ALL CATEGORIES
//               <ChevronDown
//                 className={`w-4 h-4 transform transition-transform duration-300 ${
//                   isCategoriesOpen ? 'rotate-180' : ''
//                 }`}
//               />
//             </button>

//             {isCategoriesOpen && (
//               <div className="absolute top-12 left-0 w-56 border border-gray-200 rounded shadow-lg bg-white z-10">
//                 {categories.map((cat, index) => (
//                   <div
//                     key={index}
//                     onMouseEnter={() => setActiveCategory(cat)}
//                     onMouseLeave={() => setActiveCategory(null)}
//                     className="relative group"
//                   >
//                     <div
//                       onClick={() => handleNavClick(cat.name)}
//                       className="px-4 py-2 cursor-pointer hover:text-purple-700 transition flex items-center gap-2"
//                     >
//                       {cat.icon && (
//                         <img
//                           src={cat.icon}
//                           alt={cat.name}
//                           className="w-5 h-5 object-contain"
//                         />
//                       )}
//                       {cat.name}
//                     </div>

//                     {cat.sub.length > 0 &&
//                       activeCategory?.name === cat.name && (
//                         <div className="absolute top-0 left-full w-56 py-4 bg-white shadow-lg border border-gray-200">
//                           {cat.sub.map((sub, idx) => (
//                             <div
//                               key={idx}
//                               onClick={() => handleNavClick(sub)}
//                               className="px-4 py-2 cursor-pointer whitespace-nowrap hover:text-purple-700 transition"
//                             >
//                               {sub}
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Nav Links */}
//           <nav className="flex-1 flex gap-4 lg:gap-11 text-sm font-medium z-10">
//             {navLinks.map((link, idx) => (
//               <div key={idx} className="relative group">
//                 <div
//                   onClick={() => handleNavClick(link.name)}
//                   className="flex items-center  whitespace-nowrap hover:text-purple-700 rounded-full hover:bg-gray-200 px-2 py-1.5 transition cursor-pointer uppercase"
//                 >
//                   <img
//                     src={link.icon}
//                     alt={link.name}
//                     className="w-4 h-4 object-contain"
//                   />
//                   <p className="pl-1">{link.name}</p>
//                 </div>

//                 {link.sub.length > 0 && (
//                   <div className="absolute top-11 left-0 w-48 py-2 bg-white shadow-lg border border-gray-200 opacity-0 translate-y-2 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out font-normal">
//                     {link.sub.map((subItem, i) => (
//                       <div
//                         key={i}
//                         onClick={() => handleNavClick(subItem)}
//                         className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap cursor-pointer"
//                       >
//                         {subItem}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>
//         </div>
//       </div>

//       {/* Mobile Menu + Overlay */}
//       {mobileMenuOpen && (
//         <>
//           {/* Overlay */}
//           {/* Overlay */}
//           <div
//             className="fixed top-0 left-0 w-full h-full z-40"
//             style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} // 0.2 = 20% opacity
//             onClick={() => setMobileMenuOpen(false)}
//           ></div>

//           {/* Slide-in Menu */}
//           <div className="fixed top-0 left-0 h-full w-[50%] bg-white shadow-md z-50 transform transition-transform duration-300 translate-x-0">
//             {/* Close button */}
//             <div className="flex justify-end p-4">
//               <button onClick={() => setMobileMenuOpen(false)}>
//                 <X size={24} />
//               </button>
//             </div>

//             {/* Mobile Search */}
//             <div className="px-4 py-3">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   className="border rounded-md px-4 py-2 w-full focus:ring-1 focus:ring-purple-600 focus:outline-none bg-gray-200 border-gray-200"
//                   value={query}
//                   onChange={handleSearchChange}
//                   onKeyDown={handleKeyDown}
//                 />
//                 <div
//                   onClick={handleSearchSubmit}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
//                 >
//                   <Search size={18} />
//                 </div>
//               </div>
//             </div>

//             {/* Categories */}
//             <div className="px-4">
//               <button
//                 onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
//                 className="w-full text-left flex items-center justify-between py-2 font-medium border-b"
//               >
//                 All Categories{' '}
//                 <ChevronDown
//                   className={`${
//                     mobileCategoriesOpen ? 'rotate-180' : ''
//                   } transition-transform`}
//                 />
//               </button>
//               {mobileCategoriesOpen && (
//                 <div className="pl-4">
//                   {categories.map(cat => (
//                     <div key={cat.name}>
//                       <div
//                         onClick={() => handleNavClick(cat.name)}
//                         className="py-2 cursor-pointer hover:text-purple-700"
//                       >
//                         {cat.name}
//                       </div>
//                       {cat.sub.length > 0 && (
//                         <div className="pl-4">
//                           {cat.sub.map(sub => (
//                             <div
//                               key={sub}
//                               onClick={() => handleNavClick(sub)}
//                               className="py-1 cursor-pointer hover:text-purple-700"
//                             >
//                               {sub}
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Nav Links */}
//             <div className="px-4 py-3">
//               {navLinks.map(link => (
//                 <div key={link.name}>
//                   <div
//                     onClick={() => handleNavClick(link.name)}
//                     className="py-2 cursor-pointer hover:text-purple-700 font-medium"
//                   >
//                     {link.name}
//                   </div>
//                   {link.sub.length > 0 && (
//                     <div className="pl-4">
//                       {link.sub.map(sub => (
//                         <div
//                           key={sub}
//                           onClick={() => handleNavClick(sub)}
//                           className="py-1 cursor-pointer hover:text-purple-700"
//                         >
//                           {sub}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Sign In & Cart */}
//             <div className="px-4 py-3 flex flex-col gap-2 border-t">
//               <button className="bg-color text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-800 transition">
//                 Sign In
//               </button>
//               <div className="relative cursor-pointer">
//                 <ShoppingBag size={22} />
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                   0
//                 </span>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </header>
//   );
// };

// export default Navbar;
