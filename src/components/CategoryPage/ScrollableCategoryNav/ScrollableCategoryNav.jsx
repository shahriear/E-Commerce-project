import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

function ScrollableCategoryNav({ categories, active, onClick }) {
  const scrollRef = useRef(null);

  const scroll = dir => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -250 : 250,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative flex items-center">
      {/* Left Arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute -left-0 z-10 bg-white shadow rounded-full p-1 hidden md:flex"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Scrollable Pills */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap- px-6 scrollbar-hide scroll-smooth"
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onClick(cat)}
            className={`flex-shrink-0 min-w-[105px] px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-500 ${
              active === cat
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-700 hover:text-gray-700 '
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 z-10 bg-white shadow rounded-full p-1 hidden md:flex"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default ScrollableCategoryNav;
