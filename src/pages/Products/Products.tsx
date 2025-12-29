import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  CircularProgress,
  Alert,
  Pagination,
  Chip,
  Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { ProductCard } from '@/components/ProductCard';
import { useGetSkincareProductsQuery } from '@/store/api/productsApi';
import { Search } from '@/components/Search';

const Products = () => {
  const { data, error, isLoading } = useGetSkincareProductsQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Event handlers
  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => (prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]));
  };

  // Filtering and sorting
  const filteredProducts =
    data?.products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      return matchesSearch && matchesBrand;
    }) || [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-desc':
        return b.rating - a.rating;
      case 'name-asc':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const uniqueBrands = Array.from(
    new Set(data?.products.map(product => product.brand?.trim()).filter(brand => brand) || []),
  ).sort();

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='60vh'>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth='lg' sx={{ mt: 4 }}>
        <Alert severity='error'>Error loading products. Please try again later.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth='lg'>
      <Typography variant='h4' component='h1' gutterBottom fontWeight='bold'>
        Products
      </Typography>
      <Typography variant='subtitle1' color='text.secondary'>
        {data?.total || 0} products total
      </Typography>

      <Box sx={{ mt: 2, mb: 4 }}>
        <Grid container spacing={2} alignItems='center'>
          <Grid size={{ xs: 12, md: 6 }}>
            <Search
              value={searchTerm}
              label='Search products'
              onChange={e => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Sort by</InputLabel>
              <Select value={sortBy} label='Sort by' onChange={(e: SelectChangeEvent) => setSortBy(e.target.value)}>
                <MenuItem value=''>Default</MenuItem>
                <MenuItem value='price-asc'>Price: Low to High</MenuItem>
                <MenuItem value='price-desc'>Price: High to Low</MenuItem>
                <MenuItem value='rating-desc'>Highest Rated</MenuItem>
                <MenuItem value='name-asc'>Name: A to Z</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Brand filters */}
        {uniqueBrands.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant='subtitle2' gutterBottom>
              Brands:
            </Typography>
            <Stack direction='row' spacing={1} flexWrap='wrap' gap={1}>
              {uniqueBrands.map(brand => (
                <Chip
                  key={brand}
                  label={brand}
                  onClick={() => handleBrandToggle(brand)}
                  color={selectedBrands.includes(brand) ? 'primary' : 'default'}
                  variant={selectedBrands.includes(brand) ? 'filled' : 'outlined'}
                />
              ))}
              {selectedBrands.length > 0 && (
                <Chip label='Clear all' onClick={() => setSelectedBrands([])} variant='outlined' />
              )}
            </Stack>
          </Box>
        )}
      </Box>

      {paginatedProducts.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {paginatedProducts.map(product => (
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={product.id}>
                <ProductCard {...product} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box display='flex' justifyContent='center' mt={4}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color='primary'
                size='large'
              />
            </Box>
          )}
        </>
      ) : (
        <Box textAlign='center' py={8}>
          <Typography variant='h6' color='text.secondary'>
            No products found
          </Typography>
          <Typography variant='body2' color='text.secondary' mt={1}>
            Try adjusting your search filters
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Products;
