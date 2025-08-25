import React from 'react';
import Banner from '../Home/Banner';
import FeaturedCategories from '../Home/FeaturedCategories';
import PopularProduct from '../Home/PopularProduct';
import FeaturedProducts from '../Home/FeaturedProducts/FeaturedProducts';
import CategoryBanner from '../Home/CategoryBanner/CategoryBanner';
import BagsSection from '../Home/BagsSection/BagsSection';

const Home = () => {
  return (
    <>
      <Banner />
      <FeaturedCategories />
      <PopularProduct />
      <FeaturedProducts />
      <CategoryBanner />
      <BagsSection />
    </>
  );
};

export default Home;
