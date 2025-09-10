// import React from 'react';
// import { Home, Search, Heart, Package, User } from 'lucide-react';
// import { Link, useLocation } from 'react-router-dom';

// const BottomNav = () => {
//   const location = useLocation();

//   const navItems = [
//     { name: 'Home', path: '/', icon: <Home size={22} /> },
//     { name: 'Search', path: '/search', icon: <Search size={22} /> },
//     { name: 'Wishlist', path: '/wishlist', icon: <Heart size={22} /> },
//     { name: 'Orders', path: '/orders', icon: <Package size={22} /> },
//     { name: 'Account', path: '/account', icon: <User size={22} /> },
//   ];

//   return (
//     <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md z-50 md:hidden">
//       <div className="flex justify-between items-center">
//         {navItems.map((item, idx) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <Link
//               key={idx}
//               to={item.path}
//               className={`flex flex-col items-center justify-center flex-1 py-2 text-xs ${
//                 isActive ? 'text-purple-600' : 'text-gray-600'
//               }`}
//             >
//               {item.icon}
//               <span className="mt-1">{item.name}</span>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BottomNav;
// import React, { useState } from 'react';
// import { Home, Search, Heart, Package, User, X } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const BottomNav = () => {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false); // ✅ search overlay state

//   const handleSearch = async () => {
//     const trimmed = query.trim();
//     if (!trimmed) return;

//     try {
//       setLoading(true);
//       const res = await fetch(
//         `https://dummyjson.com/products/search?q=${encodeURIComponent(trimmed)}`
//       );
//       const data = await res.json();

//       if (data.products && data.products.length > 0) {
//         navigate(`/product/${data.products[0].id}`);
//         setSearchOpen(false); // ✅ close after search
//       } else {
//         alert('No product found!');
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//       setQuery('');
//     }
//   };

//   const handleKeyDown = e => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   return (
//     <>
//       {/* 🔽 Bottom Nav */}
//       <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md z-40 md:hidden">
//         <div className="flex justify-around items-center h-14 text-gray-700 text-sm">
//           <button
//             onClick={() => navigate('/')}
//             className="flex flex-col items-center"
//           >
//             <Home size={20} />
//             <span className="text-xs">Home</span>
//           </button>

//           {/* Search */}
//           <button
//             onClick={() => setSearchOpen(true)}
//             className="flex flex-col items-center"
//           >
//             <Search size={20} />
//             <span className="text-xs">Search</span>
//           </button>

//           <button
//             onClick={() => navigate('/wishlist')}
//             className="flex flex-col items-center"
//           >
//             <Heart size={20} />
//             <span className="text-xs">Wishlist</span>
//           </button>

//           <button
//             onClick={() => navigate('/orders')}
//             className="flex flex-col items-center"
//           >
//             <Package size={20} />
//             <span className="text-xs">Orders</span>
//           </button>

//           <button
//             onClick={() => navigate('/account')}
//             className="flex flex-col items-center"
//           >
//             <User size={20} />
//             <span className="text-xs">Account</span>
//           </button>
//         </div>
//       </div>

//       {/* 🔽 Fullscreen Search Overlay */}
//       {searchOpen && (
//         <div className="fixed inset-0 bg-white z-50 flex flex-col">
//           {/* Top bar */}
//           <div className="flex items-center p-3 border-b">
//             <button
//               onClick={() => setSearchOpen(false)}
//               className="mr-3 text-gray-600"
//             >
//               <X size={24} />
//             </button>
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="flex-1 border px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-600"
//               value={query}
//               onChange={e => setQuery(e.target.value)}
//               onKeyDown={handleKeyDown}
//               autoFocus
//             />
//             <button
//               onClick={handleSearch}
//               className="ml-3 px-4 py-2 bg-purple-600 text-white rounded-md"
//             >
//               {loading ? (
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               ) : (
//                 'Go'
//               )}
//             </button>
//           </div>

//           {/* এখানে চাইলে suggestion list দেখানো যাবে */}
//           <div className="flex-1 overflow-y-auto p-4 text-gray-500 text-sm">
//             <p>Search results or suggestions will show here...</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default BottomNav;
import React, { useState } from 'react';
import { Home, Search, Heart, Package, User, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // fetch suggestion
  const fetchSuggestions = async value => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  const handleChange = e => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      fetchSuggestions(value);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = id => {
    setSearchOpen(false);
    setQuery('');
    setShowSuggestions(false);
    navigate(`/product/${id}`);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(trimmed)}`
      );
      const data = await res.json();

      if (data.products && data.products.length > 0) {
        navigate(`/product/${data.products[0].id}`);
        setSearchOpen(false);
      } else {
        alert('No product found!');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setQuery('');
      setShowSuggestions(false);
    }
  };

  // helper to check active route
  const isActive = path => location.pathname === path;

  return (
    <>
      {/* 🔽 Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md z-40 md:hidden">
        <div className="flex justify-around items-center h-14 text-gray-700 text-sm">
          <button
            onClick={() => navigate('/')}
            className={`flex flex-col items-center ${
              isActive('/') ? 'text-blue-500' : ''
            }`}
          >
            <Home size={20} />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => setSearchOpen(true)}
            className={`flex flex-col items-center ${
              searchOpen ? 'text-blue-500' : ''
            }`}
          >
            <Search size={20} />
            <span className="text-xs">Search</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className={`flex flex-col items-center ${
              isActive('/wishlist') ? 'text-blue-500' : ''
            }`}
          >
            <Heart size={20} />
            <span className="text-xs">Wishlist</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className={`flex flex-col items-center ${
              isActive('/orders') ? 'text-blue-500' : ''
            }`}
          >
            <Package size={20} />
            <span className="text-xs">Orders</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className={`flex flex-col items-center ${
              isActive('/account') ? 'text-blue-500' : ''
            }`}
          >
            <User size={20} />
            <span className="text-xs">Account</span>
          </button>
        </div>
      </div>

      {/* 🔽 Fullscreen Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center p-3 border-b border-gray-300">
            <button
              onClick={() => setSearchOpen(false)}
              className="mr-3 text-gray-600"
            >
              <X size={24} />
            </button>

            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full border border-gray-200 px-4 py-2 rounded-md bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
                ) : (
                  <Search size={18} />
                )}
              </button>
            </div>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="flex-1 overflow-y-auto">
              {suggestions.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleSuggestionClick(item.id)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BottomNav;
