import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Divider,
  Stack,
  Link as MuiLink,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { useNavigate, Link } from 'react-router';
import { useTheme } from '@mui/material/styles';

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const {items, totalQuantity, totalAmount} = useSelector((state: RootState) => state.cart);
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({id, quantity: newQuantity}));
  };

  const handleCheckout = () => {
    alert('Order placed successfully!');
    dispatch(clearCart());
    navigate('/');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const calculateDiscountPrice = (price: number, discountPercentage?: number) => {
    if (discountPercentage && discountPercentage > 0) {
      return price * (1 - discountPercentage / 100);
    }
    return price;
  };

  if (!isAuthenticated) {
    return (
      <Container>
        <Typography variant="h5" align="center" sx={{mt: 4}}>
          Please login to view your cart
        </Typography>
        <Box textAlign="center" sx={{mt: 2}}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            startIcon={<HomeIcon/>}
          >
            Go to Home
          </Button>
        </Box>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container>
        <Typography variant="h5" align="center" sx={{mt: 4}}>
          Your cart is empty
        </Typography>
        <Box textAlign="center" sx={{mt: 2}}>
          <Button
            variant="contained"
            onClick={handleContinueShopping}
            startIcon={<ArrowBackIcon/>}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      <Grid container spacing={3}>
        <Grid sx={{xs: 12, md: 8}}>
          {items.map((cartItem) => {
            const item = cartItem.product;
            const hasDiscount = item.discountPercentage && item.discountPercentage > 0;
            const discountPrice = hasDiscount
              ? calculateDiscountPrice(item.price, item.discountPercentage)
              : item.price;

            return (
              <Card key={item.id} sx={{mb: 2, display: 'flex', width: '100%'}}>
                <Box
                  onClick={() => handleProductClick(item.id)}
                  sx={{
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.thumbnail}
                    alt={item.title}
                    sx={{
                      objectFit: 'contain',
                      width: '100%',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                </Box>

                <CardContent sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}>
                  <MuiLink
                    component="button"
                    variant="h6"
                    onClick={() => handleProductClick(item.id)}
                    sx={{
                      textAlign: 'left',
                      color: 'text.primary',
                      '&:hover': {
                        color: 'primary.main',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {item.title}
                  </MuiLink>

                 {/* <Typography variant="body1" color="text.secondary" sx={{mt: 1}}>
                    ${item.price.toFixed(2)} each
                  </Typography>*/}

                  {hasDiscount ? (
                    <>
                      <Typography variant="h6" color="primary" sx={{fontWeight: 'bold'}}>
                        ${discountPrice.toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{textDecoration: 'line-through'}}
                      >
                        ${item.price.toFixed(2)}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="h6" color="primary" sx={{fontWeight: 'bold'}}>
                      ${item.price.toFixed(2)}
                    </Typography>
                  )}

                  <Box sx={{display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'space-between'}}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{
                        border: 1,
                        borderColor: theme.palette.primary.main,
                        borderRadius: 1,
                        flexShrink: 0
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, cartItem.quantity - 1)}
                        sx={{minWidth: '40px', height: '40px'}}
                        disabled={cartItem.quantity <= 1}
                      >
                        <RemoveIcon fontSize="small"/>
                      </IconButton>
                      <Typography sx={{width: '40px', textAlign: 'center'}}>
                        {cartItem.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, cartItem.quantity + 1)}
                        sx={{minWidth: '40px', height: '40px'}}
                      >
                        <AddIcon fontSize="small"/>
                      </IconButton>
                    </Stack>

                    <Typography variant="h6" color="primary">
                      ${cartItem.total.toFixed(2)}
                    </Typography>

                    <IconButton
                      color="error"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      sx={{flexShrink: 0}}
                    >
                      <DeleteIcon/>
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            );
          })}

          <Box sx={{display: 'flex', gap: 2, mt: 3}}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon/>}
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => dispatch(clearCart())}
              sx={{ml: 'auto'}}
            >
              Clear Cart
            </Button>
          </Box>
        </Grid>

        <Grid sx={{xs: 12, md: 4}}>
          <Card sx={{p: 3, position: 'sticky', top: 20}}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>

            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
              <Typography variant="body2">Items ({totalQuantity})</Typography>
              <Typography variant="body2">${totalAmount.toFixed(2)}</Typography>
            </Box>

            <Divider sx={{my: 2}}/>

            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 3}}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary">
                ${totalAmount.toFixed(2)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={<ShoppingCartCheckoutIcon/>}
              onClick={handleCheckout}
            >
              Checkout Now
            </Button>

            <Box sx={{mt: 2, textAlign: 'center'}}>
              <MuiLink
                component={Link}
                to="/"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.5,
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline'
                  }
                }}
              >
                <HomeIcon fontSize="small"/>
                <Typography variant="body2">Return to Home</Typography>
              </MuiLink>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
