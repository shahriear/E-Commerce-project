// import React from 'react';

// import { Outlet } from 'react-router-dom';
// import Navbar from '../Home/Navbar';
// import Footer from '../Home/Footer';
// import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';

// const Layout = () => {
//   return (
//     <div>
//       <Navbar />
//       <Outlet />
//       <Footer />
//       <ScrollToTopButton />
//     </div>
//   );
// };

// export default Layout;
import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';

const Layout = () => {
  return (
    <>
      <ScrollToTop /> {/* ✅ Router context এর ভিতরে */}
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Layout;
