import { Box, CircularProgress } from '@mui/material';

export const ProductsLoading = () => (
  <Box display='flex' justifyContent='center' alignItems='center' minHeight='60vh'>
    <CircularProgress />
  </Box>
);
