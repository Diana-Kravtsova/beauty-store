import React from 'react';
import { Box } from '@mui/material';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { AboutSection } from './components/AboutSection';
import { CtaSection } from './components/CtaSection';

export const Home = () => {
  return (
    <Box sx={{flexGrow: 1}}>
      <HeroSection/>
      <FeaturesSection/>
      <AboutSection/>
      <CtaSection/>
    </Box>
  );
};