import { Container, Alert } from '@mui/material';

interface ProductsErrorProps {
  message?: string;
}

export const ProductsError = ({ message = 'Error loading products. Please try again later.' }: ProductsErrorProps) => (
  <Container maxWidth='lg' sx={{ mt: 4 }}>
    <Alert severity='error'>{message}</Alert>
  </Container>
);
