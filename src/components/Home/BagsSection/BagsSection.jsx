// components/BagsSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useProducts } from '../hooks/useProducts';
// import ProductCard from '../Product/ProductCard';
// import SkeletonCard from '../SkeletonCard/SkeletonCard';
import { useNavigate } from 'react-router-dom'; // যদি React Router ব্যবহার করো
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../Product/ProductCard';
import SkeletonCard from '../../Product/SkeletonCard';
// import SkeletonCard from '../../SkeletonCard/SkeletonCard';

export default function BagsSection() {
  const { data: products, loading } = useProducts(12);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const navigate = useNavigate(); // navigation hook

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const updateArrows = () => {
      setCanScrollLeft(scrollEl.scrollLeft > 0);
      setCanScrollRight(
        scrollEl.scrollLeft + scrollEl.offsetWidth < scrollEl.scrollWidth
      );
    };

    updateArrows();
    scrollEl.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);

    return () => {
      scrollEl.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [products]);

  const scroll = direction => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    const scrollAmount = 300;
    scrollEl.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleViewAll = () => {
    navigate('/'); //  এখানে তোমার সব প্রোডাক্টের রুট সেট করো
  };

  return (
    <div className="max-w-7xl mx-auto py-6 relative">
      {/* Title + View All */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold">BAGS COLLECTION</h2>
        <button
          onClick={handleViewAll}
          className="text-gray-500 font-medium hover:underline flex items-center gap-1 border rounded-full px-3 py-1"
        >
          View All →
        </button>
      </div>

      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
          >
            <ChevronLeft />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
          >
            <ChevronRight />
          </button>
        )}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 py-4 scroll-smooth scrollbar-hide"
        >
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </div>
  );
}
