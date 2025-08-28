import React from 'react';
import Banner from '../Home/Banner';
import FeaturedCategories from '../Home/FeaturedCategories';
import PopularProduct from '../Home/PopularProduct';
import FeaturedProducts from '../Home/FeaturedProducts/FeaturedProducts';
import CategoryBanner from '../Home/CategoryBanner/CategoryBanner';
// import BagsSection from '../Home/BagsSection/BagsSection';
import DynamicSection from '../Home/DynamicSection/DynamicSection';

const Home = () => {
  return (
    <>
      <Banner />
      <FeaturedCategories />
      <PopularProduct />
      <FeaturedProducts />
      <CategoryBanner />
      <DynamicSection />
    </>
  );
};

export default Home;
