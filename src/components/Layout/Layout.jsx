// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import ScrollToTop from '../ScrollToTop/ScrollToTop';
// import Navbar from '../Home/Navbar';
// import Footer from '../Home/Footer';
// import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';

// const Layout = () => {
//   return (
//     <>
//       <ScrollToTop />
//       <Navbar />
//       <main>
//         <Outlet />
//       </main>
//       <Footer />
//       <ScrollToTopButton />
//     </>
//   );
// };

// export default Layout;
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
      <main className="pb-16">
        {/*  bottom nav space */}
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
      <BottomNav /> {/*  সবসময় নিচে থাকবে */}
    </>
  );
};

export default Layout;
