import React from 'react';
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import { Search } from '@/components/Search';

interface ProductsFiltersProps {
  searchTerm: string;
  sortBy: string;
  selectedBrands: string[];
  uniqueBrands: string[];
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onBrandToggle: (brand: string) => void;
}

export const ProductsFilters = ({
  searchTerm,
  sortBy,
  selectedBrands,
  uniqueBrands,
  onSearchChange,
  onSortChange,
  onBrandToggle,
}: ProductsFiltersProps) => {
  return (
    <Box sx={{ mt: 2, mb: 4 }}>
      <Grid container spacing={2} alignItems='center'>
        <Grid size={{ xs: 12, md: 6 }}>
          <Search
            value={searchTerm}
            label='Search products'
            onChange={e => {
              onSearchChange(e.target.value);
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Sort by</InputLabel>
            <Select value={sortBy} label='Sort by' onChange={(e: SelectChangeEvent) => onSortChange(e.target.value)}>
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
                onClick={() => onBrandToggle(brand)}
                color={selectedBrands.includes(brand) ? 'primary' : 'default'}
                variant={selectedBrands.includes(brand) ? 'filled' : 'outlined'}
              />
            ))}
            {selectedBrands.length > 0 && (
              <Chip
                label='Clear all'
                onClick={() => selectedBrands.forEach(brand => onBrandToggle(brand))}
                variant='outlined'
              />
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};
