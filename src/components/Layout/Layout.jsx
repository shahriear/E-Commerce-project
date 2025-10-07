import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import BottomNav from '../Home/BottomNav';

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
      <BottomNav />
    </>
  );
};

export default Layout;
