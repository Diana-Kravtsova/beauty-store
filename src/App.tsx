import React from 'react';
import { Outlet } from 'react-router';
import './styles/variables.scss';
import PrimarySearchAppBar from './components/Header';
import Footer from './components/Footer';

export const App = () => {
  return (
    <div>
      <PrimarySearchAppBar/>
      <main>
          <Outlet/>
      </main>
      <Footer/>
    </div>
  );
};
