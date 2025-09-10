import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CategoryPills({
  categories,
  active,
  onClick,
  mobile = false,
}) {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // scroll state update
  const updateScrollState = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 5);
  };

  // scroll button click
  const scrollByAmount = dir => {
    const el = containerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6; // 60% scroll করলে smooth হবে
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  useEffect(() => {
    updateScrollState();
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [categories]);

  return (
    <div className="relative flex items-center w-full">
      {/* Left Scroll Button */}
      {canScrollLeft && (
        <button
          onClick={() => scrollByAmount(-1)}
          className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow-md p-1 hover:bg-gray-100"
        >
          <ChevronLeft size={18} />
        </button>
      )}

      {/* Scrollable container */}
      <div
        ref={containerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-2 py-1 scroll-smooth"
      >
        {categories.map(c => (
          <button
            key={c}
            onClick={() => onClick(c)}
            className={`whitespace-nowrap rounded-full font-medium transition ${
              mobile
                ? `px-3 py-1.5 text-xs ${
                    active === c
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border'
                  }`
                : `px-4 py-2 text-sm ${
                    active === c
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Right Scroll Button */}
      {canScrollRight && (
        <button
          onClick={() => scrollByAmount(1)}
          className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow-md p-1 hover:bg-gray-100"
        >
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}
//dlt hoite paree..........
