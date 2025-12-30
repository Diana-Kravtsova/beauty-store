import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useGetSkincareProductsQuery } from '@/store/api/productsApi';
import { ProductsLoading } from '@/components/Product/ProductsLoading';
import { ProductsError } from '@/components/Product/ProductsError';
import { ProductsFilters } from '@/components/Product/ProductsFilters';
import { ProductsGrid } from '@/components/Product/ProductsGrid';

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
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
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

  if (isLoading) return <ProductsLoading />;
  if (error) return <ProductsError />;

  return (
    <Container maxWidth='lg'>
      <Typography variant='h4' component='h1' gutterBottom fontWeight='bold'>
        Products
      </Typography>
      <Typography variant='subtitle1' color='text.secondary'>
        {data?.total || 0} products total
      </Typography>

      <ProductsFilters
        searchTerm={searchTerm}
        sortBy={sortBy}
        selectedBrands={selectedBrands}
        uniqueBrands={uniqueBrands}
        onSortChange={setSortBy}
        onSearchChange={handleSearchChange}
        onBrandToggle={handleBrandToggle}
      />

      <ProductsGrid products={paginatedProducts} currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </Container>
  );
};

export default Products;
