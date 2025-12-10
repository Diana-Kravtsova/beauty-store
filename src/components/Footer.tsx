import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  ShoppingCart,
  Favorite,
  Store,
  Email,
  Phone,
  LocationOn,
  Person,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{xs: 12, sm: 6, md: 6}}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Store color="primary"/>
              <Typography variant="h6" fontWeight="bold">
                DummyShop
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Demo e-commerce store powered by DummyJSON API.
              All products are for demonstration purposes only.
            </Typography>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Follow us
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton
                  size="small"
                  sx={{
                    backgroundColor: 'action.hover',
                    '&:hover': {backgroundColor: 'primary.main'},
                  }}
                >
                  <Facebook fontSize="small"/>
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    backgroundColor: 'action.hover',
                    '&:hover': {backgroundColor: 'primary.main'},
                  }}
                >
                  <Twitter fontSize="small"/>
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    backgroundColor: 'action.hover',
                    '&:hover': {backgroundColor: 'primary.main'},
                  }}
                >
                  <Instagram fontSize="small"/>
                </IconButton>
              </Stack>
            </Box>
          </Grid>

          <Grid size={{xs: 12, sm: 6, md: 6}}>
            <Grid container spacing={3}>
              <Grid size={{xs: 12, sm: 6}}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Navigation
                </Typography>
                <Stack spacing={1}>
                  <MuiLink
                    component={RouterLink}
                    to="/"
                    color="text.secondary"
                    underline="hover"
                  >
                    Home
                  </MuiLink>
                  <MuiLink
                    component={RouterLink}
                    to="/products"
                    color="text.secondary"
                    underline="hover"
                  >
                    All Products
                  </MuiLink>
                  <MuiLink
                    component={RouterLink}
                    to="/cart"
                    color="text.secondary"
                    underline="hover"
                  >
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <ShoppingCart fontSize="small"/>
                      Cart
                    </Box>
                  </MuiLink>
                  <MuiLink
                    component={RouterLink}
                    to="/wishlist"
                    color="text.secondary"
                    underline="hover"
                  >
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Favorite fontSize="small"/>
                      Wishlist
                    </Box>
                  </MuiLink>
                  <MuiLink
                    component={RouterLink}
                    to="/login"
                    color="text.secondary"
                    underline="hover"
                  >
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Person fontSize="small"/>
                      Login
                    </Box>
                  </MuiLink>
                </Stack>
              </Grid>

              <Grid size={{xs: 12, sm: 6}}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Contact
                </Typography>
                <Stack spacing={1.5}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Phone fontSize="small" color="action"/>
                    <Typography variant="body2" color="text.secondary">
                      +1 (555) 123-4567
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Email fontSize="small" color="action"/>
                    <Typography variant="body2" color="text.secondary">
                      info@dummyshop.com
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOn fontSize="small" color="action"/>
                    <Typography variant="body2" color="text.secondary">
                      123 Demo St, Test City
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{my: 4}}/>

        <Box
          display="flex"
          flexDirection={{xs: 'column', sm: 'row'}}
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear}. Demo Project
          </Typography>

          <Box display="flex" gap={3}>
            <MuiLink
              href="https://dummyjson.com"
              target="_blank"
              rel="noopener noreferrer"
              color="text.secondary"
              underline="hover"
              variant="body2"
            >
              Powered by DummyJSON API
            </MuiLink>
            <Typography variant="body2" color="text.secondary">
              Version 1.0.0
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
