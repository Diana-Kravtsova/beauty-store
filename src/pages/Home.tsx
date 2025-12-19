import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Paper,
} from '@mui/material';
import {
  ShoppingBag,
  LocalShipping,
  Security,
  Replay,
  ArrowForward,
  Store,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router';

const features = [
  {
    icon: <Store fontSize="large"/>,
    title: 'Demo Products',
    description: 'Browse our collection of demo products from various categories.',
  },
  {
    icon: <LocalShipping fontSize="large"/>,
    title: 'Fast Delivery',
    description: 'Experience our efficient delivery system.',
  },
  {
    icon: <Security fontSize="large"/>,
    title: 'Secure Shopping',
    description: 'Your data is protected with advanced security.',
  },
  {
    icon: <Replay fontSize="large"/>,
    title: 'Easy Returns',
    description: 'Simple and hassle-free return process.',
  },
];

export const Home = () => {
  return (
    <Box sx={{flexGrow: 1}}>
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
          py: {xs: 10, md: 15},
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              position: 'relative',
              p: {xs: 3, md: 6},
              textAlign: 'center',
            }}
          >
            <ShoppingBag sx={{fontSize: 60, mb: 2}}/>
            <Typography
              component="h1"
              variant="h2"
              color="inherit"
              gutterBottom
              sx={{fontWeight: 'bold'}}
            >
              Welcome
            </Typography>
            <Typography variant="h5" color="inherit" sx={{mb: 4, opacity: 0.9}}>
              A demonstration e-commerce platform built with React and MUI.
              Explore our demo products and experience the interface.
            </Typography>
            <Stack
              direction={{xs: 'column', sm: 'row'}}
              spacing={2}
              justifyContent="center"
            >
              <Button
                component={RouterLink}
                to="/products"
                variant="contained"
                size="large"
                endIcon={<ArrowForward/>}
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

      <Container sx={{py: 8}}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          gutterBottom
          sx={{fontWeight: 'bold', mb: 6}}
        >
          Why Choose
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid key={index} size={{xs: 12, sm: 6, md: 4}}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <Box
                  sx={{
                    color: 'primary.main',
                    mb: 2,
                    p: 2,
                    borderRadius: '50%',
                    backgroundColor: 'action.hover',
                  }}
                >
                  {feature.icon}
                </Box>
                <CardContent sx={{flexGrow: 1, p: 0}}>
                  <Typography gutterBottom variant="h6" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{py: 8}}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{xs: 12, md: 6}}>
              <Typography
                component="h2"
                variant="h4"
                gutterBottom
                sx={{fontWeight: 'bold'}}
              >
                About This Project
              </Typography>
              <Typography variant="body1" sx={{mb: 3}}>
                Shop is a demonstration e-commerce application built with React,
                Material-UI v5, and React Router. It serves as a template for modern
                web applications with clean design and responsive layout.
              </Typography>
              <Typography variant="body1" sx={{mb: 3}}>
                This project showcases:
              </Typography>
              <Box component="ul" sx={{pl: 2, mb: 3}}>
                <Typography component="li" variant="body1" sx={{mb: 1}}>
                  Modern React with hooks and functional components
                </Typography>
                <Typography component="li" variant="body1" sx={{mb: 1}}>
                  Material-UI v5 with dark theme support
                </Typography>
                <Typography component="li" variant="body1" sx={{mb: 1}}>
                  React Router v6 for navigation
                </Typography>
                <Typography component="li" variant="body1">
                  Responsive design for all devices
                </Typography>
              </Box>
              <Button
                component={RouterLink}
                to="/products"
                variant="outlined"
                size="large"
                endIcon={<ArrowForward/>}
              >
                Explore Products
              </Button>
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <Box
                component="img"
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: 3,
                  display: {xs: 'none', md: 'block'},
                }}
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="E-commerce dashboard"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container sx={{py: 8}}>
        <Paper
          sx={{
            p: {xs: 4, md: 6},
            textAlign: 'center',
            borderRadius: 2,
            border: '1px solid'
          }}
        >
          <Typography variant="h4" component="h3" gutterBottom sx={{fontWeight: 'bold'}}>
            Ready to Explore?
          </Typography>
          <Typography variant="body1" sx={{mb: 4, maxWidth: 600, mx: 'auto', opacity: 0.9}}>
            Start browsing our demo products and experience the interface.
            Perfect for testing and demonstration purposes.
          </Typography>
          <Button
            component={RouterLink}
            to="/products"
            variant="contained"
            size="large"
            endIcon={<ArrowForward/>}
            color={'success'}
            sx={{
              px: 5,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            Get Started
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};
