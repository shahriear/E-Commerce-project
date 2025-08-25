import React, { useState } from 'react';
import CategoryList from '../CategoryPage/Sidebar/CategoryList';
import PriceFilter from '../CategoryPage/Sidebar/PriceFilter';
import RatingFilter from '../CategoryPage/Sidebar/RatingFilter';
import FeaturedProducts from '../CategoryPage/Sidebar/FeaturedProducts';
import ProductGrid from '../CategoryPage/ProductGrid/ProductGrid';
import ShowDropdown from '../CategoryPage/Controls/ShowDropdown';
import ViewToggle from '../CategoryPage/Controls/ViewToggle';

const CategoryPage = ({ selectedCategoryFromNav }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    selectedCategoryFromNav || 'all'
  );
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [rating, setRating] = useState(null);
  const [view, setView] = useState('grid3');
  const [limit, setLimit] = useState(20);

  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      {/* Sidebar */}
      <aside className="col-span-3 space-y-6">
        <CategoryList onSelect={setSelectedCategory} />
        <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
        <RatingFilter setRating={setRating} />
        <FeaturedProducts setSelectedCategory={setSelectedCategory} />
      </aside>

      {/* Main Products */}
      <main className="col-span-9">
        <div className="flex justify-between items-center mb-4">
          <ShowDropdown limit={limit} setLimit={setLimit} />
          <ViewToggle view={view} setView={setView} />
        </div>
        <ProductGrid
          category={selectedCategory}
          priceRange={priceRange}
          rating={rating}
          view={view}
          limit={limit}
        />
      </main>
    </div>
  );
};

export default CategoryPage;

// aita try kora hoy nai pore korbo---- -----------

// import React, { useState } from "react";
// import CategoryFilter from "../CategoryPage/Sidebar/CategoryFilter";
// import PriceFilter from "../CategoryPage/Sidebar/PriceFilter";
// import RatingFilter from "../CategoryPage/Sidebar/RatingFilter";
// import FeaturedProducts from "../CategoryPage/Sidebar/FeaturedProducts";

// import ShowDropdown from "../CategoryPage/Controls/ShowDropdown";
// import ViewToggle from "../CategoryPage/Controls/ViewToggle";
// import ProductGrid from "../CategoryPage/Products/ProductGrid";

// const Category = () => {
//   const [view, setView] = useState("grid3"); // grid3, grid4, list
//   const [show, setShow] = useState(12);
//   const [category, setCategory] = useState("all");
//   const [priceRange, setPriceRange] = useState([0, 2000]);
//   const [rating, setRating] = useState(null);

//   return (
//     <div className="container mx-auto py-6 grid grid-cols-12 gap-6">
//       {/* Sidebar */}
//       <aside className="col-span-12 md:col-span-3 space-y-6">
//         <CategoryFilter setCategory={setCategory} />
//         <PriceFilter setPriceRange={setPriceRange} />
//         <RatingFilter setRating={setRating} />
//         <FeaturedProducts />
//       </aside>

//       {/* Main Content */}
//       <main className="col-span-12 md:col-span-9">
//         {/* Top Controls */}
//         <div className="flex items-center justify-between mb-6">
//           <ShowDropdown show={show} setShow={setShow} />
//           <ViewToggle view={view} setView={setView} />
//         </div>

//         {/* Products */}
//         <ProductGrid
//           category={category}
//           priceRange={priceRange}
//           rating={rating}
//           view={view}
//           show={show}
//         />
//       </main>
//     </div>
//   );
// };

// export default Category;
