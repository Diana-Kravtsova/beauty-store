import React from 'react';
import './styles/variables.scss';
import { Link, Outlet } from 'react-router';

export const App = () =>{
  return (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/products">Products</Link>
      <Outlet/>
    </div>
  )
}
