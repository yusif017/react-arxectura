import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import { Home }from './pages/Pages';


const routes = [
  { path: '/', element: <Home />, layout: Layout },
  
];

const Router = () => (
  <Routes>
    {routes.map(({ path, element, layout: LayoutComponent }) => (
      <Route key={path} path={path} element={<LayoutComponent>{element}</LayoutComponent>} />
    ))}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default Router;
