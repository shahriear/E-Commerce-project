import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HScroller({ children }) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 5);
  };

  const scrollByAmount = dir => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [children]);

  return (
    <div className="relative ">
      {canScrollLeft && (
        <button
          aria-label="Prev"
          onClick={() => scrollByAmount(-1)}
          className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow p-2 hover:shadow-md "
        >
          <ChevronLeft />
        </button>
      )}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-2 no-scrollbar scrollbar-hide "
      >
        {children}
      </div>
      {canScrollRight && (
        <button
          aria-label="Next"
          onClick={() => scrollByAmount(1)}
          className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow p-2 hover:shadow-md"
        >
          <ChevronRight />
        </button>
      )}
    </div>
  );
}
