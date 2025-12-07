import React from 'react';
import { Outlet } from 'react-router';
import './styles/variables.scss';
import PrimarySearchAppBar from './components/Header';

export const App = () => {
  return (
    <div>
      <PrimarySearchAppBar/>
      <main>
          <Outlet/>
      </main>
      <footer>Footer</footer>
    </div>
  );
};
