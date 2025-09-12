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

import FeaturedCategoryPage from './components/Pages/FeaturedCategoryPage';

import ProductDetailsPages from './components/Pages/ProductDetailsPages';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="featured/:category" element={<FeaturedCategoryPage />} />

        <Route path="/category/:category" element={<FeaturedCategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailsPages />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position={window.innerWidth < 768 ? 'top-center' : 'bottom-right'}
        autoClose={1500}
        closeOnClick
        pauseOnHover
        theme="colored"
        draggable
        toastClassName="!rounded-md !shadow-md !text-[11px] md:!text-[15px] !p-2 md:!p-3 !pr-3 md:!pr-4 !w-[50%] sm:!w-[250px] !mx-auto md:!ml-auto md:!mr-2 whitespace-nowrap"
        bodyClassName="font-dm text-[12px] md:text-[20px]"
      />
    </>
  );
}

export default App;
