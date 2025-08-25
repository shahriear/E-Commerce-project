// import React from 'react';

// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from 'react-router-dom';

// import Layout from './components/Layout/Layout';
// import Home from './components/Pages/Home';
// import { ToastContainer } from 'react-toastify';

// function App() {
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<Layout />}>
//         <Route index element={<Home />} />

//         {/* <Route path="/blog/:id" element={<BlogDetails />} /> */}
//         {/* <Route path="*" element={<PageNotFound />} /> */}
//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           closeOnClick
//           pauseOnHover
//           draggable
//           toastClassName="!rounded-md !shadow-md !text-[11px] md:!text-[15px] !p-3 !pr-4 !w-[60%] md:!w-[320px] !ml-auto !mr-2"
//           bodyClassName="font-dm text-[13px] md:text-[20px]"
//         />
//       </Route>
//     )
//   );
//   return <RouterProvider router={router}></RouterProvider>;
// }

// export default App;
import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Home from './components/Pages/Home';
import { ToastContainer } from 'react-toastify';
import CategoryPage from './components/Pages/CategoryPage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="category" element={<CategoryPage />} />
        {/* <Route path="category" index element={<CategoryPage />} /> */}
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        closeOnClick
        pauseOnHover
        theme="colored"
        draggable
        toastClassName="!rounded-md !shadow-md !text-[11px] md:!text-[15px] !p-3 !pr-4 !w-[40%] md:!w-[250px] !ml-auto !mr-2"
        bodyClassName="font-dm text-[13px] md:text-[20px]"
      />
    </>
  );
}

export default App;
