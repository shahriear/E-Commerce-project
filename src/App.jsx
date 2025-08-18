import React from 'react';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Home from './components/Pages/Home';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        {/* <Route path="/blog/:id" element={<BlogDetails />} /> */}
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Route>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
