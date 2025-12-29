import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { Store, LocalShipping, Security, Replay } from '@mui/icons-material';
import { FeatureCard } from './FeatureCard';

const features = [
  {
    icon: <Store fontSize="large" />,
    title: 'Demo Products',
    description: 'Browse our collection of demo products from various categories.',
  },
  {
    icon: <LocalShipping fontSize="large" />,
    title: 'Fast Delivery',
    description: 'Experience our efficient delivery system.',
  },
  {
    icon: <Security fontSize="large" />,
    title: 'Secure Shopping',
    description: 'Your data is protected with advanced security.',
  },
  {
    icon: <Replay fontSize="large" />,
    title: 'Easy Returns',
    description: 'Simple and hassle-free return process.',
  },
];

export const FeaturesSection = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography
        component="h2"
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 6 }}
      >
        Why Choose
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
