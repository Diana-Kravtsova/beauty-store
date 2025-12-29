import React from 'react';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export const HeaderCartIcon = () => {
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) return null;

  return (
    <IconButton component={Link} to='/cart' size='large'>
      <Badge badgeContent={totalQuantity} color='error'>
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};
