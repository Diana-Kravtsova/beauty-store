import React from 'react';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addToCart } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router';

interface CartButtonProps {
  product: {
    id: number;
    title: string;
    price: number;
    quantity?: number;
    thumbnail?: string;
  };
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  onClick?: (e: React.MouseEvent) => void;
  fullWidth?: boolean;
}

export const CartButton = ({
                             product,
                             variant = 'contained',
                             size = 'medium',
                             onClick,
                             fullWidth = false
                           }: CartButtonProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    } else {
      e.stopPropagation();
    }

    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    if (isInCart) {
      navigate('/cart');
    } else {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: product.quantity,
        thumbnail: product.thumbnail,
      }));
    }
  };

  return (
    <Button
      variant={variant}
      color={isInCart ? 'success' : 'primary'}
      size={size}
      startIcon={isInCart ? <ShoppingBagIcon/> : <ShoppingCartIcon/>}
      onClick={handleAddToCart}
      disabled={!isAuthenticated}
      fullWidth={fullWidth}
      sx={{
        whiteSpace: 'nowrap',
        minWidth: 'fit-content'
      }}
    >
      {isInCart ? 'In cart' : 'Add to Cart'}
    </Button>
  );
};
