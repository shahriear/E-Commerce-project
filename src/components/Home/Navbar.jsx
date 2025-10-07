import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ShoppingBag, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SearchPopup from '../Popup/SearchPopup';

import { HiOutlineShoppingBag } from 'react-icons/hi';
import ScrollContainer from 'react-indiana-drag-scroll';
import { toast } from 'react-toastify';

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
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [query, setQuery] = useState('');
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeLink, setActiveLink] = useState(null);

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

  const handleSearchChange = e => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) fetchSuggestions(value);
    else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

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

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [sidebarOpen]);

  const handleNavClick = name => navigate(`/featured/${name}`);
  const handleCategoryClick = name => navigate(`/featured/${name}`);

  const toggleCategory = cat => {
    if (cat.sub.length > 0) {
      setActiveCategory(activeCategory === cat.name ? null : cat.name);
    } else {
      handleCategoryClick(cat.name);
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Desktop & Mobile Top Navbar */}
      <header
        className={` md:block w-full border-b border-gray-200 bg-white sticky top-0 z-40 transition-transform duration-300 transform ${
          show ? 'translate-y-0' : '-translate-y- md:-translate-y-24'
        }`}
      >
        <div className="bg-color text-white py-1 text-center md:text-sm text-[10px] ">
          Due to the <span className="font-semibold">COVID-19</span> epidemic,
          orders may be processed with a slight delay
        </div>

        <div
          className={`hidden lg:block w-full border- border-gray-200 bg-white sticky top-0 z-50 transition-transform duration-300 ${
            show ? 'translate-y-0' : '-translate-y-0'
          }`}
        >
          <div className="container mx-auto px-4 flex items-center justify-between py-3">
            <div className="flex items-center gap-4 lg:gap-6 flex-1">
              <Link to={'/'}>
                <img
                  src="/Logo.png"
                  alt="Logo"
                  className="w-36 h-fit object-cover rounded-full"
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
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 100)
                  }
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
                        onClick={() => handleSuggestionClick(item.id)}
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

            <div className="flex items-center gap-4 ml-11">
              <button
                className="bg-color text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-800 transition"
                onClick={() => toast.error('Please Login to continue')}
              >
                Sign In
              </button>
              <div
                className="relative cursor-pointer"
                onClick={() => toast.error('Please Login to continue')}
              >
                <ShoppingBag size={22} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 flex items-center gap-10 py-3">
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

        <div className="lg:hidden border-b border-gray-200 bg-white sticky top-0 z-50">
          <div className="flex justify-between items-center h-14 px-4  bg-white">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden">
              <Menu size={24} />
            </button>

            <Link to="/" className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src="/Logo.png"
                alt="Logo"
                className="h-10 sm:h-12 object-contain rounded-full"
              />
            </Link>

            <div
              onClick={() => toast.error('Please Login to continue')}
              className="relative w-10 h-10 cursor-pointer"
            >
              <HiOutlineShoppingBag className="w-full h-full p-2 text-red-400 bg-red-100 rounded-full" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-md">
                0
              </span>
            </div>
          </div>

          <ScrollContainer
            className="flex gap-4 px-4 py-2 overflow-x-auto  scrollbar-hide cursor-grab"
            vertical={false}
          >
            {navLinks.map((link, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActiveLink(link.name);
                  handleNavClick(link.name);
                }}
                className={`flex items-center gap-2 whitespace-nowrap 
                 rounded-full px-3 py-1.5 text-sm font-medium
                 hover:text-purple-600 hover:bg-purple-50
                 transition-all duration-200 ease-in-out
                 cursor-pointer select-none group
                 ${activeLink === link.name ? 'text-blue-600' : ''}
               `}
              >
                <img
                  src={link.icon}
                  alt={link.name}
                  className="w-4 h-4 object-contain group-hover:scale-110 transition-transform duration-200"
                />
                <span>{link.name}</span>
              </div>
            ))}
          </ScrollContainer>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white z-50 w-4/5 max-w-xs shadow-lg transform transition-transform duration-500 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" onClick={() => setSidebarOpen(false)}>
              <img
                src="/Logo.png"
                alt="Logo"
                className="w-fit h-12 object-contain rounded-full "
              />
            </Link>
            <button onClick={() => setSidebarOpen(false)}>
              <X
                size={26}
                className="bg-gray-200 rounded-full hover:bg-blue-100 p-0.5 "
              />
            </button>
          </div>
          <SearchPopup />

          <div className="flex flex-col gap-3 mt-4 ">
            {categories.map((cat, idx) => (
              <div key={idx} className="flex flex-col">
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-100 py-2 px-2 rounded-2xl font-semibold"
                  onClick={() => toggleCategory(cat)}
                >
                  <div className="flex items-center gap-2">
                    {cat.icon && <img src={cat.icon} className="w-5 h-5" />}
                    <span>{cat.name}</span>
                  </div>

                  {cat.sub.length > 0 && (
                    <ChevronDown
                      size={20}
                      className={` transform transition-transform duration-500 rounded-2xl bg-gray-100  ${
                        activeCategory === cat.name ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </div>

                {cat.sub.length > 0 && (
                  <div
                    className={`pl-6 flex flex-col mt-1 gap-2 overflow-hidden transition-all duration-500 ease-in-out bg-gray-100 rounded-2xl 
                      ${
                        activeCategory === cat.name
                          ? 'max-h-40 opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                  >
                    {cat.sub.map((sub, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          handleCategoryClick(sub);
                          setSidebarOpen(false);
                        }}
                        className="cursor-pointer hover:text-purple-700 rounded-xl"
                      >
                        {sub}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            className="mt-6 bg-color text-white px-4 py-2 rounded-xl hover:bg-indigo-900"
            onClick={() => toast.error('Please Login to continue')}
          >
            Sign In
          </button>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
