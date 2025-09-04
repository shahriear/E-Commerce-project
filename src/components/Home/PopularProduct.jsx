import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../config/categoryMap';
import { useCategoryProducts } from '../hooks/useCategoryProducts';
import { useNewProducts } from '../hooks/useNewProducts';

import ProductCard from '../Product/ProductCard';
import SkeletonCard from '../Product/SkeletonCard';
import HScroller from '../Scroller/HScroller';
import CategoryPills from '../Categories/CategoryPills';
import ScrollableCategoryNav from '../CategoryPage/ScrollableCategoryNav/ScrollableCategoryNav';
import BannerAds from './BannerAds-popularProduct/BannerAds';

export default function EcommerceHome() {
  const [activeCategory, setActiveCategory] = useState('Fashion');

  const { data: popularProducts, loading: popularLoading } =
    useCategoryProducts(activeCategory);

  const { data: newProducts, loading: newLoading } = useNewProducts();

  return (
    <div className="min-h-screen w-full bg-gray-50 container">
      <div className="mx-auto max-w-8xl py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Banner */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-5">
            <img
              src="/ads1.jpg"
              alt="Banner Ads"
              className="w-[250px] h-auto object-cover rounded-lg shadow"
            />
            <img
              src="/ads2.jpg"
              alt="Banner Ads"
              className="w-[250px] h-auto object-cover rounded-lg shadow"
            />
          </div>
        </aside>

        {/* Right Product  */}
        <div className="lg:col-span-3 space-y-10">
          {/* Mobile Category Pills */}
          <div className="flex flex-wrap gap-2 md:hidden px-2">
            <CategoryPills
              categories={CATEGORIES}
              active={activeCategory}
              onClick={setActiveCategory}
              mobile
            />
          </div>

          {/* Popular Products Section */}
          <section>
            <header className="sticky top-0 z-30 bg-gray-50">
              <div className="flex items-center justify-between px-4 py-3 gap-4">
                <div>
                  <h2 className="text-lg font-bold">POPULAR PRODUCTS</h2>
                  <p className="text-xs text-gray-500">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>
                <div className="flex-1 max-w-[60%]">
                  <ScrollableCategoryNav
                    categories={CATEGORIES}
                    active={activeCategory}
                    onClick={setActiveCategory}
                  />
                </div>
              </div>
            </header>

            <div className="mb-3 flex items-end justify-between">
              <div className="hidden md:block text-sm font-semibold text-gray-700">
                {activeCategory}
              </div>
            </div>

            {popularLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <HScroller visibleItems={5}>
                {popularProducts.map(p => (
                  <motion.div
                    key={p.id}
                    layout
                    whileHover={{ backgroundColor: '#f3f4f6' }}
                    className="snap-start w-[90%] md:w-[280px] p-1 rounded-xl transition-colors duration-200"
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </HScroller>
            )}
          </section>

          {/* New Products Grid */}
          <section>
            <div className="mb-3">
              <h2 className="text-lg font-bold">NEW PRODUCTS</h2>
              <p className="text-xs text-gray-500">
                New products with updated stocks.
              </p>
            </div>

            {newLoading ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
              >
                {newProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </motion.div>
            )}
          </section>
          <BannerAds />
        </div>
      </div>
    </div>
  );
}
