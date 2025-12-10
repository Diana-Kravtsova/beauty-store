import React from 'react';
import { Container, Grid, Typography, Box, Card, CardMedia, CardContent, IconButton, Chip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router';
import { Button } from '@mui/material';
import CartButton from '../components/CartButton';

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);

  const handleCardClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleRemoveFromWishlist = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    dispatch(removeFromWishlist(productId));
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
          Please login to view your wishlist
        </Typography>
      </Container>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <Container>
        <Typography variant="h5" align="center" sx={{mt: 4}}>
          Your wishlist is empty
        </Typography>
        <Box textAlign="center" sx={{mt: 2}}>
          <Button component={Link} to="/" variant="contained">
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{py: 4}}>
      <Typography variant="h4" gutterBottom>
        My Wishlist ({wishlistItems.length} items)
      </Typography>

      <Grid container spacing={3}>
        {wishlistItems.map((item) => {
          const hasDiscount = item.discountPercentage && item.discountPercentage > 0;
          const discountPrice = hasDiscount
            ? calculateDiscountPrice(item.price, item.discountPercentage)
            : item.price;

          return (
            <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}} key={item.id}>
              <Card
                onClick={() => handleCardClick(item.id)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                  },
                  position: 'relative',
                }}
              >
                <Box sx={{position: 'relative'}}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.thumbnail}
                    alt={item.title}
                    sx={{objectFit: 'contain'}}
                  />

                  {hasDiscount && (
                    <Chip
                      label={`-${item.discountPercentage}%`}
                      color="error"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                      }}
                    />
                  )}
                </Box>

                <CardContent sx={{flexGrow: 1}}>
                  <Typography variant="h6" noWrap>
                    {item.title}
                  </Typography>

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
                </CardContent>

                <Box sx={{p: 2, pt: 0}}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1, alignItems: 'center'}}>
                    <Box sx={{flexGrow: 1}} onClick={(e) => e.stopPropagation()}>
                      <CartButton
                        product={{
                          id: item.id,
                          title: item.title,
                          price: discountPrice,
                          thumbnail: item.thumbnail
                        }}
                        variant="contained"
                        size="small"
                        fullWidth
                      />
                    </Box>
                    <IconButton
                      color="error"
                      onClick={(e) => handleRemoveFromWishlist(e, item.id)}
                    >
                      <DeleteIcon/>
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Wishlist;
