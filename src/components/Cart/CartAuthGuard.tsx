import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router';

export const CartAuthGuard = () => {
  return (
    <Container>
      <Typography variant='h5' align='center' sx={{ mt: 4 }}>
        Please login to view your cart
      </Typography>
      <Box textAlign='center' sx={{ mt: 2 }}>
        <Button component={Link} to='/' variant='contained' startIcon={<HomeIcon />}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};
