import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductsResponse, Product } from '../types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['Products'],
  endpoints: build => ({
    getSkincareProducts: build.query<ProductsResponse, void>({
      query: () => 'products',
    }),
    getProductById: build.query<Product, string>({
      query: id => `products/${id}`,
    }),
  }),
});

export const { useGetSkincareProductsQuery, useGetProductByIdQuery } = productsApi;
