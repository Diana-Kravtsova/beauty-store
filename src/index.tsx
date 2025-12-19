import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';

import { App } from './App';
import { Home } from './pages/Home';
import { LoginLazy } from './pages/Login/Login.lazy';
import { ProductsLazy } from './pages/Products/Products.lazy';
import { ProductDetailsLazy } from './pages/ProductDetails/ProductDetails.lazy';
import { ErrorPage } from './pages/ErrorPage';
import { store } from './store';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: 'login',
        element: <LoginLazy/>,
      },
      {
        path: 'cart',
        element: <Cart/>,
      },
      {
        path: 'wishlist',
        element: <Wishlist/>,
      },
      {
        path: 'products',
        element: <ProductsLazy/>,
      },
      {
        path: 'products/:id',
        element: <ProductDetailsLazy/>,
      }
    ]
  },
]);

const container = createRoot(root);
container.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
