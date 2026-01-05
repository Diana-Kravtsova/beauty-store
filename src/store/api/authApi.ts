import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, LoginCredentials } from '../types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/auth/',
  }),
  endpoints: builder => ({
    login: builder.mutation<User, LoginCredentials>({
      query: credentials => ({
        url: 'login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
