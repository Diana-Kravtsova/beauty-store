import React from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router';

export const CtaSection = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Paper
        sx={{
          p: { xs: 4, md: 6 },
          textAlign: 'center',
          borderRadius: 2,
          border: '1px solid'
        }}
      >
        <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Ready to Explore?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto', opacity: 0.9 }}>
          Start browsing our demo products and experience the interface.
          Perfect for testing and demonstration purposes.
        </Typography>
        <Button
          component={RouterLink}
          to="/products"
          variant="contained"
          size="large"
          endIcon={<ArrowForward />}
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
  );
};
