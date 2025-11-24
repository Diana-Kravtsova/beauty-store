import React from 'react';
import { Link, Outlet } from 'react-router';
import Button from '@mui/material/Button';
import LinearProgress  from '@mui/material/LinearProgress';
import Box  from '@mui/material/Box';
import './styles/variables.scss';

export const App = () =>{
  return (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/products">Products</Link>
      <Button variant="contained">Hello world</Button>
      <Outlet/>
    </div>
  )
}
