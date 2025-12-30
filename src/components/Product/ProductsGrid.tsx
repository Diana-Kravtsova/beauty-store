import React from 'react';
import { Grid, Box, Pagination, Typography } from '@mui/material';
import { ProductCard } from './ProductCard';
import { Product } from '@/store/types';

interface ProductsGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ProductsGrid = ({ products, currentPage, totalPages, onPageChange }: ProductsGridProps) => {
  if (products.length === 0) {
    return (
      <Box textAlign='center' py={8}>
        <Typography variant='h6' color='text.secondary'>
          No products found
        </Typography>
        <Typography variant='body2' color='text.secondary' mt={1}>
          Try adjusting your search filters
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={product.id}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box display='flex' justifyContent='center' mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, value) => onPageChange(value)}
            color='primary'
            size='large'
          />
        </Box>
      )}
    </>
  );
};
