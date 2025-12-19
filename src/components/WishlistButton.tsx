import { Box, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import React from 'react';

interface WishlistButtonProps {
  product: {
    id: number;
    title: string;
    price: number;
    images?: string[];
    thumbnail?: string;
  };
  size?: 'small' | 'medium' | 'large';
}

export const WishlistButton = ({product, size = 'small'}: WishlistButtonProps) => {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      alert('Please login to add items to wishlist');
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      }));
    }
  };

  return (
    <Box sx={{
      position: 'absolute',
      top: 8,
      left: 8,
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    }}>
      <IconButton
        size={size}
        onClick={handleToggleWishlist}
        color={isInWishlist ? 'error' : 'default'}
        disabled={!isAuthenticated}
        sx={{border: '1px solid'}}
      >
        {isInWishlist ? (
          <FavoriteIcon fontSize="small" color="error"/>
        ) : (
          <FavoriteBorderIcon fontSize="small"/>
        )} </IconButton>
    </Box>
  );
};
