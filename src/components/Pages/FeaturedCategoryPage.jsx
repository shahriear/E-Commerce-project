// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useCategoryProducts } from '../hooks/useCategoryProducts';
// import ProductCard from '../Product/ProductCard';
// import SkeletonCard from '../Product/SkeletonCard';

// const FeaturedCategoryPage = () => {
//   const { category } = useParams();
//   const { data: products, loading } = useCategoryProducts(category);

//   return (
//     <div className="container mx-auto py-10">
//       <h2 className="text-2xl font-bold mb-6">
//         {category.toUpperCase()} PRODUCTS
//       </h2>

//       {loading ? (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {Array.from({ length: 8 }).map((_, i) => (
//             <SkeletonCard key={i} />
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {products.map(p => (
//             <ProductCard key={p.id} product={p} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FeaturedCategoryPage;
// import React, { useState, useMemo } from 'react';
// import { useParams } from 'react-router-dom';
// import { useCategoryProducts } from '../hooks/useCategoryProducts';
// import ProductCard from '../Product/ProductCard';
// import SkeletonCard from '../Product/SkeletonCard';

// // Import your new modular components
// import PriceFilter from '../CategoryPage/Sidebar/PriceFilter';
// import RatingFilter from '../CategoryPage/Sidebar/RatingFilter';
// import ViewToggle from '../CategoryPage/Controls/ViewToggle';
// import ShowDropdown from '../CategoryPage/Controls/ShowDropdown';
// // import RatingFilter from '../Filters/RatingFilter';
// // import ViewToggle from '../Filters/ViewToggle';
// // import ShowDropdown from '../Filters/ShowDropdown';

// const FeaturedCategoryPage = () => {
//   const { category } = useParams();
//   const { data: products, loading } = useCategoryProducts(category);

//   // Filters
//   const [priceRange, setPriceRange] = useState([0, 2000]);
//   const [rating, setRating] = useState(0);

//   // View & Limit
//   const [view, setView] = useState('grid3'); // default 3 per row
//   const [limit, setLimit] = useState(10); // default 20 products

//   // Compute products per row based on view
//   const productsPerRow = useMemo(() => {
//     if (view === 'list') return 1;
//     if (view === 'grid3') return 3;
//     if (view === 'grid4') return 4;
//     return 3;
//   }, [view]);

//   // Filtered & limited products
//   const filteredProducts = useMemo(() => {
//     return products
//       .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
//       .filter(p => (p.rating || 0) >= rating)
//       .slice(0, limit);
//   }, [products, priceRange, rating, limit]);

//   return (
//     <div className="container mx-auto py-10 flex flex-col lg:flex-row gap-6">
//       {/* Left Sidebar */}
//       <aside className="lg:w-1/4 flex flex-col gap-4">
//         <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
//         <RatingFilter setRating={setRating} />
//       </aside>

//       {/* Right Side */}
//       <div className="lg:w-3/4 flex flex-col gap-4">
//         {/* Top Controls */}
//         <div className="flex items-center justify-between flex-wrap gap-4">
//           <ViewToggle view={view} setView={setView} />
//           <ShowDropdown limit={limit} setLimit={setLimit} />
//         </div>

//         {/* Products Grid */}
//         {loading ? (
//           <div
//             className={`grid grid-cols-2 md:grid-cols-${productsPerRow} gap-4`}
//           >
//             {Array.from({ length: 8 }).map((_, i) => (
//               <SkeletonCard key={i} />
//             ))}
//           </div>
//         ) : filteredProducts.length === 0 ? (
//           <p>No products found for selected filters.</p>
//         ) : (
//           <div
//             className={`grid grid-cols-1 md:grid-cols-${productsPerRow} gap-4`}
//           >
//             {filteredProducts.map(p => (
//               <ProductCard key={p.id} product={p} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FeaturedCategoryPage;

//
// import React, { useState, useEffect, useMemo } from 'react';
// import ProductCard from '../Product/ProductCard';
// import SkeletonCard from '../Product/SkeletonCard';

// import PriceFilter from '../CategoryPage/Sidebar/PriceFilter';
// import RatingFilter from '../CategoryPage/Sidebar/RatingFilter';
// import ViewToggle from '../CategoryPage/Controls/ViewToggle';
// import ShowDropdown from '../CategoryPage/Controls/ShowDropdown';
// import ScrollableCategoryFilter from '../ScrollableCategoryNav/ScrollableCategoryFilter';
// // import ScrollableCategoryFilter from '../Filters/ScrollableCategoryFilter';

// // Sub-category slug mapping for dummyjson API
// const SUB_CATEGORY_MAP = {
//   Man: ['mens-shirts', 'mens-shoes'],
//   Woman: ['womens-bags', 'womens-jewellery'],
//   Laptops: ['laptops'],
//   'Smart Watch': ['smartphones'], // approximation
//   Accessories: ['smartphones'], // approximation
//   Cameras: ['cameras'],
//   'Man Bags': ['mens-bags'],
//   'Woman Bags': ['womens-bags'],
//   'Man Footwear': ['mens-shoes'],
//   'Woman Footwear': ['womens-shoes'],
// };

// const FeaturedCategoryPage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Filters
//   const [priceRange, setPriceRange] = useState([0, 2000]);
//   const [rating, setRating] = useState(0);

//   // View & limit
//   const [view, setView] = useState('grid3');
//   const [limit, setLimit] = useState(10);

//   // Active sub-category
//   const [activeSubCategory, setActiveSubCategory] = useState('');

//   // Fetch products by slug
//   const fetchProductsBySlug = async slugs => {
//     setLoading(true);
//     try {
//       let allProducts = [];
//       for (let slug of slugs) {
//         const res = await fetch(
//           `https://dummyjson.com/products/category/${slug}?limit=20`
//         );
//         const json = await res.json();
//         allProducts = allProducts.concat(json.products || []);
//       }
//       setProducts(allProducts);
//     } catch (e) {
//       console.error(e);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle sub-category click
//   const handleSubCategoryClick = subCat => {
//     setActiveSubCategory(subCat);
//     const slugs = SUB_CATEGORY_MAP[subCat] || [];
//     fetchProductsBySlug(slugs);
//   };

//   // Determine number of columns based on view
//   const productsPerRow = useMemo(() => {
//     if (view === 'list') return 1;
//     if (view === 'grid3') return 3;
//     if (view === 'grid4') return 4;
//     return 3;
//   }, [view]);

//   // Filtered products by price & rating
//   const filteredProducts = useMemo(() => {
//     return products
//       .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
//       .filter(p => (p.rating || 0) >= rating)
//       .slice(0, limit);
//   }, [products, priceRange, rating, limit]);

//   // Sub-categories for vertical list
//   const subCategories = [
//     'Man',
//     'Woman',
//     'Laptops',
//     'Smart Watch',
//     'Accessories',
//     'Cameras',
//     'Man Bags',
//     'Woman Bags',
//     'Man Footwear',
//     'Woman Footwear',
//   ];

//   return (
//     <div className="container mx-auto py-10 flex flex-col lg:flex-row gap-6">
//       {/* Left Sidebar */}
//       <aside className="lg:w-1/4 flex flex-col gap-4">
//         <ScrollableCategoryFilter
//           categories={subCategories}
//           active={activeSubCategory}
//           onClick={handleSubCategoryClick}
//         />
//         <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
//         <RatingFilter setRating={setRating} />
//       </aside>

//       {/* Right Side */}
//       <div className="lg:w-3/4 flex flex-col gap-4">
//         {/* Top Controls */}
//         <div className="flex items-center justify-between flex-wrap gap-4">
//           <ViewToggle view={view} setView={setView} />
//           <ShowDropdown limit={limit} setLimit={setLimit} />
//         </div>

//         {/* Products Grid */}
//         {loading ? (
//           <div
//             className={`grid grid-cols-1 md:grid-cols-${productsPerRow} gap-4`}
//           >
//             {Array.from({ length: 8 }).map((_, i) => (
//               <SkeletonCard key={i} />
//             ))}
//           </div>
//         ) : filteredProducts.length === 0 ? (
//           <p>No products found for selected filters.</p>
//         ) : (
//           <div
//             className={`grid grid-cols-1 md:grid-cols-${productsPerRow} gap-4`}
//           >
//             {filteredProducts.map(p => (
//               <ProductCard key={p.id} product={p} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FeaturedCategoryPage;
import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../Product/ProductCard';
import SkeletonCard from '../Product/SkeletonCard';

import PriceFilter from '../CategoryPage/Sidebar/PriceFilter';
import RatingFilter from '../CategoryPage/Sidebar/RatingFilter';
import ViewToggle from '../CategoryPage/Controls/ViewToggle';
import ShowDropdown from '../CategoryPage/Controls/ShowDropdown';
import ScrollableCategoryFilter from '../ScrollableCategoryNav/ScrollableCategoryFilter';

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
  const [view, setView] = useState('grid3');
  const [limit, setLimit] = useState(10);

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
      </aside>

      {/* Right Side */}
      <div className="lg:w-3/4 flex flex-col gap-4">
        {/* Top Controls */}
        <div className="flex items-center justify-between flex-wrap gap-4">
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
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedCategoryPage;

// // FeaturedCategoryPage.jsx
// import React, { useEffect, useState, useMemo } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import ProductCard from '../Product/ProductCard';
// import SkeletonCard from '../Product/SkeletonCard';

// import PriceFilter from '../CategoryPage/Sidebar/PriceFilter';
// import RatingFilter from '../CategoryPage/Sidebar/RatingFilter';
// import ViewToggle from '../CategoryPage/Controls/ViewToggle';
// import ShowDropdown from '../CategoryPage/Controls/ShowDropdown';
// import ScrollableCategoryFilter from '../ScrollableCategoryNav/ScrollableCategoryFilter';

// // Main category slug mapping
// const CATEGORY_MAP = {
//   Fashion: 'mens-shirts',
//   Electronics: 'smartphones',
//   Bags: 'womens-bags',
//   Footwear: 'womens-shoes',
//   Groceries: 'groceries',
//   Beauty: 'beauty',
//   Wellness: 'fragrances',
//   Jewellery: 'womens-jewellery',
// };

// // Sub-category mapping
// const SUB_CATEGORY_MAP = {
//   Man: ['mens-shirts', 'mens-shoes'],
//   Woman: ['womens-bags', 'womens-jewellery'],
//   Laptops: ['laptops'],
//   'Smart Phone': ['smartphones'],
//   Accessories: ['sunglasses', 'lighting'],
//   Furniture: ['furniture'],
//   'Man Bags': ['fragrances'],
//   'Woman Bags': ['womens-bags'],
//   'Man Footwear': ['mens-shoes'],
//   'Woman Footwear': ['womens-shoes'],
// };

// const FeaturedCategoryPage = () => {
//   const { category } = useParams(); // Featured category or search
//   const location = useLocation();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Filters
//   const [priceRange, setPriceRange] = useState([0, 2000]);
//   const [rating, setRating] = useState(0);

//   // View & limit
//   const [view, setView] = useState('grid3');
//   const [limit, setLimit] = useState(10);

//   // Active sub-category
//   const [activeSubCategory, setActiveSubCategory] = useState('');

//   // Get search query from URL
//   const queryParams = new URLSearchParams(location.search);
//   const searchQuery = queryParams.get('query');

//   // Fetch products by slug or search
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       let allProducts = [];

//       if (searchQuery) {
//         // Fetch search results
//         const res = await fetch(
//           `https://dummyjson.com/products/search?q=${searchQuery}`
//         );
//         const data = await res.json();
//         allProducts = data.products || [];
//       } else {
//         // Fetch by category/sub-category
//         const slugs = SUB_CATEGORY_MAP[category] || [
//           CATEGORY_MAP[category] || 'mens-shirts',
//         ];
//         for (let slug of slugs) {
//           const res = await fetch(
//             `https://dummyjson.com/products/category/${slug}?limit=50`
//           );
//           const data = await res.json();
//           allProducts = allProducts.concat(data.products || []);
//         }
//       }

//       setProducts(allProducts);
//     } catch (e) {
//       console.error(e);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setActiveSubCategory(''); // Reset sub-category
//     fetchProducts();
//   }, [category, searchQuery]);

//   // Handle sub-category click
//   const handleSubCategoryClick = subCat => {
//     setActiveSubCategory(subCat);
//     const slugs = SUB_CATEGORY_MAP[subCat] || [];
//     const fetchSub = async () => {
//       setLoading(true);
//       try {
//         let allProducts = [];
//         for (let slug of slugs) {
//           const res = await fetch(
//             `https://dummyjson.com/products/category/${slug}?limit=50`
//           );
//           const data = await res.json();
//           allProducts = allProducts.concat(data.products || []);
//         }
//         setProducts(allProducts);
//       } catch {
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSub();
//   };

//   // Products per row based on view
//   const productsPerRow = useMemo(() => {
//     if (view === 'list') return 1;
//     if (view === 'grid3') return 3;
//     if (view === 'grid4') return 4;
//     return 3;
//   }, [view]);

//   // Filtered & limited products
//   const filteredProducts = useMemo(() => {
//     return products
//       .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
//       .filter(p => (p.rating || 0) >= rating)
//       .slice(0, limit);
//   }, [products, priceRange, rating, limit]);

//   // Sub-categories list for sidebar
//   const subCategories = [
//     'Man',
//     'Woman',
//     'Laptops',
//     'Smart Phone',
//     'Accessories',
//     'Furniture',
//     'Man Bags',
//     'Woman Bags',
//     'Man Footwear',
//     'Woman Footwear',
//   ];

//   return (
//     <div className="container mx-auto py-10 flex flex-col lg:flex-row gap-6">
//       {/* Left Sidebar */}
//       {!searchQuery && (
//         <aside className="lg:w-1/4 flex flex-col gap-4">
//           <ScrollableCategoryFilter
//             categories={subCategories}
//             active={activeSubCategory}
//             onClick={handleSubCategoryClick}
//           />
//           <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
//           <RatingFilter setRating={setRating} />
//         </aside>
//       )}

//       {/* Right Side */}
//       <div
//         className={`flex-1 flex flex-col gap-4 ${
//           !searchQuery ? 'lg:w-3/4' : ''
//         }`}
//       >
//         {/* Top Controls */}
//         {!searchQuery && (
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <ViewToggle view={view} setView={setView} />
//             <ShowDropdown limit={limit} setLimit={setLimit} />
//           </div>
//         )}

//         {/* Products Grid */}
//         {loading ? (
//           <div
//             className={`grid grid-cols-1 md:grid-cols-${productsPerRow} gap-4`}
//           >
//             {Array.from({ length: 8 }).map((_, i) => (
//               <SkeletonCard key={i} />
//             ))}
//           </div>
//         ) : filteredProducts.length === 0 ? (
//           <p>No products found for "{searchQuery || category}".</p>
//         ) : (
//           <div
//             className={`grid grid-cols-1 md:grid-cols-${productsPerRow} gap-4`}
//           >
//             {filteredProducts.map(p => (
//               <ProductCard key={p.id} product={p} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FeaturedCategoryPage;
