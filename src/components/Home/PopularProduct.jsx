import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../config/categoryMap';
import { useCategoryProducts } from '../hooks/useCategoryProducts';
import { useNewProducts } from '../hooks/useNewProducts';

import ProductCard from '../Product/ProductCard';
import SkeletonCard from '../Product/SkeletonCard';
import HScroller from '../Scroller/HScroller';
import ScrollableCategoryNav from '../CategoryPage/ScrollableCategoryNav/ScrollableCategoryNav';
import BannerAds from './BannerAds-popularProduct/BannerAds';

export default function EcommerceHome() {
  const [activeCategory, setActiveCategory] = useState('Fashion');

  const { data: popularProducts, loading: popularLoading } =
    useCategoryProducts(activeCategory);

  const { data: newProducts, loading: newLoading } = useNewProducts();

  return (
    <div className="container min-h-screen w-full bg-gray-50 px-0 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-8xl py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 space-y-5">
            <img
              src="/ads1.jpg"
              alt="Banner Ads"
              className="w-full sm:w-[250px] h-auto object-cover rounded-lg shadow"
            />
            <img
              src="/ads2.jpg"
              alt="Banner Ads"
              className="w-full sm:w-[250px] h-auto object-cover rounded-lg shadow"
            />
          </div>
        </aside>

        {/* Right Product */}
        <div className="lg:col-span-3 space-y-10 pl-3">
          {/* Popular Products Section */}
          <section>
            <header className="sticky top-0 z-30 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between md:px-4 py-3 gap-4 ">
                <div>
                  <h2 className="text-[17px] md:text-xl font-semibold sm:text-xl ">
                    POPULAR PRODUCTS
                  </h2>
                  <p className="text-xs text-gray-500">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>
                <div className="w-full sm:w-[60%] ">
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
                    className="snap-start w-[60%] sm:w-[220px] md:w-[250px] p-1 rounded-xl transition-colors duration-200"
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </HScroller>
            )}
          </section>

          {/* New Products Section */}
          <section>
            <div className="mb-3 flex items-center justify-between px-2 sm:px-0 ">
              <div>
                <h2 className="text-[17px] md:text-xl font-semibold sm:text-xl ">
                  NEW PRODUCTS
                </h2>
                <p className="text-xs text-gray-500">
                  New products with updated stocks.
                </p>
              </div>
            </div>

            {newLoading ? (
              <div className="flex gap-4 overflow-x-auto py-2 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-4 ">
                {Array.from({ length: 1 }).map((_, i) => (
                  <SkeletonCard
                    key={i}
                    className="min-w-[150px] sm:min-w-[180px] flex-shrink-0 md:flex-shrink md:min-w-0 "
                  />
                ))}
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto py-2 md:grid md:grid-cols-3 lg:grid-cols-3 md:gap-4 xl:grid-cols-4 scrollbar-hide">
                {newProducts.map(p => (
                  <div
                    key={p.id}
                    className="min-w-[150px] sm:min-w-[180px] flex-shrink-0 md:flex-shrink md:min-w-0 w-43 md:w-full"
                  >
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* BannerAds */}
          <BannerAds />

          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-5 hidden ">
              <img
                src="/ads1.jpg"
                alt="Banner Ads"
                className="w-full sm:w-[250px] h-auto object-cover rounded-lg shadow"
              />
              <img
                src="/ads2.jpg"
                alt="Banner Ads"
                className="w-full sm:w-[250px] h-auto object-cover rounded-lg shadow"
              />
            </div>

            <div className="lg:hidden mt-6 flex gap-4">
              <img
                src="/ads1.jpg"
                alt="Banner Ads"
                className="w-2/5 h-auto object-cover rounded-lg shadow"
              />
              <img
                src="/ads2.jpg"
                alt="Banner Ads"
                className="w-2/5  h-auto object-cover rounded-lg shadow"
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
