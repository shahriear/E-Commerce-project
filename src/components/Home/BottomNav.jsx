import React, { useState } from 'react';
import { Home, Search, Heart, Package, User, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  const isActive = path => location.pathname === path;

  return (
    <>
      {/*  Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md z-30 md:hidden">
        <div className="flex justify-around items-center h-15 text-gray-700 text-sm">
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
            onClick={() => {
              toast.error('Please Login to continue');
              navigate('/');
            }}
            className={`flex flex-col items-center ${
              isActive('/wishlist') ? 'text-blue-500' : ''
            }`}
          >
            <Heart size={20} />
            <span className="text-xs">Wishlist</span>
          </button>

          <button
            onClick={() => {
              toast.error('Please Login to continue');
              navigate('/');
            }}
            className={`flex flex-col items-center ${
              isActive('/orders') ? 'text-blue-500' : ''
            }`}
          >
            <Package size={20} />
            <span className="text-xs">Orders</span>
          </button>

          <button
            onClick={() => {
              toast.error('Please Login to continue');
              navigate('/');
            }}
            className={`flex flex-col items-center ${
              isActive('/account') ? 'text-blue-500' : ''
            }`}
          >
            <User size={20} />
            <span className="text-xs">Account</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex  items-center p-3 border-b border-gray-300">
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
