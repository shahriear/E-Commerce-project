import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../Product/ProductCard';
import SkeletonCard from '../Product/SkeletonCard';

import PriceFilter from '../CategoryPage/Sidebar/PriceFilter';
import RatingFilter from '../CategoryPage/Sidebar/RatingFilter';
import ViewToggle from '../CategoryPage/Controls/ViewToggle';
import ShowDropdown from '../CategoryPage/Controls/ShowDropdown';
import ScrollableCategoryFilter from '../ScrollableCategoryNav/ScrollableCategoryFilter';
import FeaturedProducts from '../Home/FeaturedProducts/FeaturedProducts';
import SingleFeaturedSlider from '../CategoryPage/SingleFeatureProducts/SingleFeaturedSlider';

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

const FeaturedCategoryPage = () => {
  const { category } = useParams(); // From Navbar click
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

  // Fetch products by slug (main category or sub-category)
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

  // Fetch on page load (FeaturedCategories click)
  useEffect(() => {
    setActiveSubCategory(''); // Reset sub-category
    // Check if category is a sub-category
    const slugs = SUB_CATEGORY_MAP[category] || [
      CATEGORY_MAP[category] || 'mens-shirts',
    ];
    fetchProductsBySlug(slugs);
  }, [category]);

  // Handle sub-category click (sidebar)
  const handleSubCategoryClick = subCat => {
    setActiveSubCategory(subCat);
    const slugs = SUB_CATEGORY_MAP[subCat] || [];
    fetchProductsBySlug(slugs);
  };

  // Products per row based on view
  const productsPerRow = useMemo(() => {
    if (view === 'list') return 1;
    if (view === 'grid3') return 3;
    if (view === 'grid4') return 4;
    return 3;
  }, [view]);

  // Filtered & limited products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
      .filter(p => (p.rating || 0) >= rating)
      .slice(0, limit);
  }, [products, priceRange, rating, limit]);

  // Sub-categories list for sidebar
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
    <div className="container mx-auto py-10 flex flex-col lg:flex-row gap-6">
      {/* Left Sidebar */}
      <aside className="lg:w-1/4 flex flex-col gap-4">
        <ScrollableCategoryFilter
          categories={subCategories}
          active={activeSubCategory}
          onClick={handleSubCategoryClick}
        />
        <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
        <RatingFilter setRating={setRating} />
        <SingleFeaturedSlider />
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
      </aside>

      {/* Right Side */}
      <div className="lg:w-3/4 flex flex-col gap-4">
        {/* Top Controls */}
        <div className="flex items-center justify-between flex-wrap gap-4 bg-indigo-50 py-2 px-2 ">
          <ViewToggle view={view} setView={setView} />
          <ShowDropdown limit={limit} setLimit={setLimit} />
        </div>

        {/* Products Grid */}
        {loading ? (
          <div
            className={`grid grid-cols-1 md:grid-cols-${productsPerRow} gap-4`}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <p>No products found for selected filters.</p>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-${productsPerRow} gap-4`}
          >
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} view={view} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedCategoryPage;
