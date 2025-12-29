import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';

export const CartEmpty = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <Container>
      <Typography variant="h5" align="center" sx={{ mt: 4 }}>
        Your cart is empty
      </Typography>
      <Box textAlign="center" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          onClick={handleContinueShopping}
          startIcon={<ArrowBackIcon />}
        >
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
};
