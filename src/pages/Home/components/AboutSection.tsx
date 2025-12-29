import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router';

export const AboutSection = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth='lg'>
        <Grid container spacing={6} alignItems='center'>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography component='h2' variant='h4' gutterBottom sx={{ fontWeight: 'bold' }}>
              About This Project
            </Typography>
            <Typography variant='body1' sx={{ mb: 3 }}>
              Shop is a demonstration e-commerce application built with React, Material-UI v5, and React Router. It
              serves as a template for modern web applications with clean design and responsive layout.
            </Typography>
            <Typography variant='body1' sx={{ mb: 3 }}>
              This project showcases:
            </Typography>
            <Box component='ul' sx={{ pl: 2, mb: 3 }}>
              <Typography component='li' variant='body1' sx={{ mb: 1 }}>
                Modern React with hooks and functional components
              </Typography>
              <Typography component='li' variant='body1' sx={{ mb: 1 }}>
                Material-UI v5 with dark theme support
              </Typography>
              <Typography component='li' variant='body1' sx={{ mb: 1 }}>
                React Router v6 for navigation
              </Typography>
              <Typography component='li' variant='body1'>
                Responsive design for all devices
              </Typography>
            </Box>
            <Button component={RouterLink} to='/products' variant='outlined' size='large' endIcon={<ArrowForward />}>
              Explore Products
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component='img'
              sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: 3,
                display: { xs: 'none', md: 'block' },
              }}
              src='https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
              alt='E-commerce dashboard'
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
