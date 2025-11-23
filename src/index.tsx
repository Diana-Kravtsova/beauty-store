import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router';

import { App } from './App';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/login',
        element: <Login/>,
      },
      {
        path: '/products',
        element: <Products/>,
      },
      {
        path: '/product/:productId',
        element: <ProductDetail/>,
      },
    ]
  },
]);

const container = createRoot(root);
container.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
