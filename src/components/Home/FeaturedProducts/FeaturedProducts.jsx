import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../Product/ProductCard';
import SkeletonCard from '../../Product/SkeletonCard';

export default function FeaturedProducts() {
  const { data: products, loading } = useProducts(12);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

  return (
    <div className="max-w-7xl mx-auto py-6 space-y-6 relative">
      <div>
        <h2 className="text-xl font-bold">FEATURED PRODUCTS</h2>
        <p className="text-sm text-gray-500">
          Do not miss the current offers until the end of March.
        </p>
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
