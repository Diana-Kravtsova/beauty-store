import React from 'react';
import { Box, Container, Typography, Button, Stack, Paper } from '@mui/material';
import { ShoppingBag, ArrowForward } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router';

export const HeroSection = () => {
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))',
        py: { xs: 10, md: 15 },
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            position: 'relative',
            p: { xs: 3, md: 6 },
            textAlign: 'center',
          }}
        >
          <ShoppingBag sx={{ fontSize: 60, mb: 2 }} />
          <Typography
            component="h1"
            variant="h2"
            color="inherit"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Welcome
          </Typography>
          <Typography variant="h5" color="inherit" sx={{ mb: 4, opacity: 0.9 }}>
            A demonstration e-commerce platform built with React and MUI.
            Explore our demo products and experience the interface.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              component={RouterLink}
              to="/products"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              Browse Products
            </Button>
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Sign In
            </Button>
          </Stack>
        </Box>
      </Container>
    </Paper>
  );
};
