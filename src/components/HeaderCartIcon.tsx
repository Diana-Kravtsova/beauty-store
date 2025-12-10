import React from 'react';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const HeaderCartIcon = () => {
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) return null;

  return (
    <IconButton
      component={Link}
      to="/cart"
      color="inherit"
      size="large"
    >
      <Badge badgeContent={totalQuantity} color="error">
        <ShoppingCartIcon/>
      </Badge>
    </IconButton>
  );
};

export default HeaderCartIcon;