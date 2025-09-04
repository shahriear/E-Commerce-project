import React from 'react';
import Banner from '../Home/Banner';
import FeaturedManus from '../Home/FeaturedManus';
import PopularProduct from '../Home/PopularProduct';
import FeaturedProducts from '../Home/FeaturedProducts/FeaturedProducts';
import CategoryBanner from '../Home/CategoryBanner/CategoryBanner';

import DynamicSection from '../Home/DynamicSection/DynamicSection';

const Home = () => {
  return (
    <>
      <Banner />
      <FeaturedManus />
      <PopularProduct />
      <FeaturedProducts />
      <CategoryBanner />
      <DynamicSection />
    </>
  );
};

export default Home;
