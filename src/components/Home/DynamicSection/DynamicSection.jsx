import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../Product/ProductCard';
import SkeletonCard from '../../Product/SkeletonCard';
import { FaArrowRightLong } from 'react-icons/fa6';

// Main categories
const CATEGORIES = [
  'Fashion',
  'Electronics',
  'Bags',
  'Footwear',
  'Groceries',
  'Beauty',
  'Wellness',
  'Jewellery',
];

// Category slug mapping for dummyjson
const CATEGORY_SLUGS = {
  Fashion: 'mens-shirts',
  Electronics: 'smartphones',
  Bags: 'womens-bags',
  Footwear: 'womens-shoes',
  Groceries: 'groceries',
  Beauty: 'beauty',
  Wellness: 'fragrances',
  Jewellery: 'womens-jewellery',
};

export default function DynamicSection() {
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const navigate = useNavigate();

  // On page load, pick a random category
  useEffect(() => {
    const randomCategory =
      CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    setCategory(randomCategory);

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const slug = CATEGORY_SLUGS[randomCategory] || 'mens-shirts';
        const res = await fetch(
          `https://dummyjson.com/products/category/${slug}?limit=12`
        );
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Scroll arrows logic
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
    navigate(`/category/${category}`);
  };

  if (!category) return null;

  return (
    <div className="max-w-7xl mx-auto py-6 pl-4 md:pl-0 relative">
      {/* Title + View All */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-[17px] md:text-xl font-semibold">
            {category.toUpperCase()}
          </h2>
          <p className="text-xs text-gray-500">
            Do not miss the current offers until the end of March.
          </p>
        </div>

        <button
          onClick={handleViewAll}
          className="text-gray-500 font-semibold md:font-medium hover:underline flex items-center gap-1 border rounded-full px-2 md:px-3 py-1 text-[11px] md:text-[15px] mr-3 whitespace-nowrap"
        >
          View All
          <FaArrowRightLong />
        </button>
      </div>

      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10 hidden md:flex"
          >
            <ChevronLeft />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10 hidden md:flex"
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
