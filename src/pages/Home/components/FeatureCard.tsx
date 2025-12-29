import React, { ReactNode } from 'react';
import { Card, Box, Typography, CardContent } from '@mui/material';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
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
        {icon}
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 0 }}>
        <Typography gutterBottom variant="h6" component="h3">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};
