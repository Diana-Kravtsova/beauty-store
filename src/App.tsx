import React from 'react';
import { Outlet } from 'react-router';
import './styles/variables.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Box } from '@mui/material';

export const App = () => {
  return (
    <>
      <Header />
      <Box component='main' sx={{ py: 4 }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};
