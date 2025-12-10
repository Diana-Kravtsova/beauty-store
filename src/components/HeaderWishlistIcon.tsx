import React from 'react';
import { Badge, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const HeaderWishlistIcon = () => {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) return null;

  const hasItems = wishlistItems.length > 0;

  return (
    <IconButton
      component={Link}
      to="/wishlist"
      color="inherit"
      size="large"
    >
      {hasItems ? (
        <Badge badgeContent={wishlistItems.length} color="error">
          <FavoriteIcon/>
        </Badge>
      ) : (
        <FavoriteBorderIcon/>
      )}
    </IconButton>
  );
};

export default HeaderWishlistIcon;
