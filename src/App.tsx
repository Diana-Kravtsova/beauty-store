import React, { Suspense } from 'react';
import { Outlet } from 'react-router';
import './styles/variables.scss';
import PrimarySearchAppBar from './components/Header';

export const App = () => {
  return (
    <div>
      <PrimarySearchAppBar/>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet/>
        </Suspense>
      </main>
      <footer>Footer</footer>
    </div>
  );
};
