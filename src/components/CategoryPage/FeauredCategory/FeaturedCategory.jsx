import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../Product/ProductCard';
import SkeletonCard from '../../Product/SkeletonCard';

import PriceFilter from '../../CategoryPage/Sidebar/PriceFilter';
import RatingFilter from '../../CategoryPage/Sidebar/RatingFilter';
import ViewToggle from '../../CategoryPage/Controls/ViewToggle';
import ShowDropdown from '../../CategoryPage/Controls/ShowDropdown';
import ScrollableCategoryFilter from '../../CategoryPage/ScrollableCategoryNav/ScrollableCategoryFilter';

import SingleFeaturedSlider from '../../CategoryPage/SingleFeatureProducts/SingleFeaturedSlider';
import { motion, AnimatePresence } from 'framer-motion';

// Main category slug mapping
const CATEGORY_MAP = {
  Fashion: 'mens-shirts',
  Electronics: 'smartphones',
  Bags: 'womens-bags',
  Footwear: 'womens-shoes',
  Groceries: 'groceries',
  Beauty: 'beauty',
  Wellness: 'fragrances',
  Jewellery: 'womens-jewellery',
};

// Sub-category mapping
const SUB_CATEGORY_MAP = {
  Man: ['mens-shirts', 'mens-shoes'],
  Woman: ['womens-bags', 'womens-jewellery'],
  Laptops: ['laptops'],
  'Smart Phone': ['smartphones'],
  Accessories: ['sunglasses', 'lighting'],
  Furniture: ['furniture'],
  'Man Bags': ['fragrances'],
  'Woman Bags': ['womens-bags'],
  'Man Footwear': ['mens-shoes'],
  'Woman Footwear': ['womens-shoes'],
};

const FeaturedCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [rating, setRating] = useState(0);

  // View & limit
  const [view, setView] = useState('grid4');
  const [limit, setLimit] = useState(20);

  // Active sub-category
  const [activeSubCategory, setActiveSubCategory] = useState('');

  const fetchProductsBySlug = async slugs => {
    setLoading(true);
    try {
      let allProducts = [];
      for (let slug of slugs) {
        const res = await fetch(
          `https://dummyjson.com/products/category/${slug}?limit=50`
        );
        const json = await res.json();
        allProducts = allProducts.concat(json.products || []);
      }
      setProducts(allProducts);
    } catch (e) {
      console.error(e);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setActiveSubCategory('');

    const slugs = SUB_CATEGORY_MAP[category] || [
      CATEGORY_MAP[category] || 'mens-shirts',
    ];
    fetchProductsBySlug(slugs);
  }, [category]);

  const handleSubCategoryClick = subCat => {
    setActiveSubCategory(subCat);
    const slugs = SUB_CATEGORY_MAP[subCat] || [];
    fetchProductsBySlug(slugs);
  };

  const productsPerRow = useMemo(() => {
    if (view === 'list') return 1;
    if (view === 'grid3') return 3;
    if (view === 'grid4') return 4;
    return 3;
  }, [view]);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
      .filter(p => (p.rating || 0) >= rating)
      .slice(0, limit);
  }, [products, priceRange, rating, limit]);

  const subCategories = [
    'Man',
    'Woman',
    'Laptops',
    'Smart Phone',
    'Accessories',
    'Furniture',
    'Man Bags',
    'Woman Bags',
    'Man Footwear',
    'Woman Footwear',
  ];

  return (
    <div className="container mx-auto py-8 flex flex-col lg:flex-row gap-6">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex lg:w-1/4 flex-col gap-4">
        <ScrollableCategoryFilter
          categories={subCategories}
          active={activeSubCategory}
          onClick={handleSubCategoryClick}
        />
        <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
        <RatingFilter setRating={setRating} />
        <SingleFeaturedSlider />

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
      </aside>

      {/* Right Side */}
      <div className="lg:w-3/4 flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-4 bg-indigo-50 py-2 px-2 ">
          <ViewToggle view={view} setView={setView} />
          <ShowDropdown limit={limit} setLimit={setLimit} />
        </div>

        {loading ? (
          <div className="flex justify-center min-h-[500px] items-center py-10">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : !loading && filteredProducts.length === 0 ? (
          //
          <p className="text-center text-gray-600">
            No products found for selected filters.
          </p>
        ) : (
          <motion.div
            layout
            className={`grid 
            ${
              view === 'list'
                ? 'grid-cols-1'
                : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-' +
                  productsPerRow
            } 
               gap-4`}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <AnimatePresence>
              {filteredProducts.map(p => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={p} view={view} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FeaturedCategory;
