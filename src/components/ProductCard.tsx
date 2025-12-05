import React, { useMemo } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
} from '@mui/material';
import { Product } from '../store/types';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router';

interface ProductCardProps {
  product: Product;
  //onAddToCart?: (product: Product) => void;
}

const ProductCard = ({product /*,onAddToCart*/}: ProductCardProps) => {
  const navigate = useNavigate();
  const discountPrice = useMemo(() =>
      product.price * (1 - product.discountPercentage / 100),
    [product.price, product.discountPercentage]
  );

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`, {
      state: {product},
    });
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    /*
        onAddToCart?.(product);
    */
  };

  return (
    <Card
      onClick={handleViewDetails}
      sx={{
        /*TODO make a file with all card styles*/
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
          cursor: 'pointer',
        },
      }}
    >
      <Box sx={{position: 'relative'}}>
        <CardMedia
          component="img"
          height="200"
          image={product.thumbnail}
          alt={product.title}
          sx={{objectFit: 'contain'}}
        />

        {product.discountPercentage > 0 && (
          <Chip
            label={`-${product.discountPercentage}%`}
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          />
        )}
      </Box>

      <CardContent sx={{flexGrow: 1}}>
        <Typography gutterBottom variant="h6" component="h3" noWrap>
          {product.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.description}
        </Typography>

        <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
          <Rating value={product.rating} precision={0.5} readOnly size="small"/>
          <Typography variant="body2" color="text.secondary" sx={{ml: 1}}>
            ({product.rating})
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
          Brand: {product.brand}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          In stock: {product.stock} pcs.
        </Typography>
      </CardContent>

      <CardActions sx={{justifyContent: 'space-between', p: 2, pt: 0}}>
        <Box>
          {product.discountPercentage > 0 ? (
            <>
              <Typography
                variant="h6"
                color="primary"
                sx={{fontWeight: 'bold'}}
              >
                ${discountPrice.toFixed(2)}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{textDecoration: 'line-through'}}
              >
                ${product.price.toFixed(2)}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" color="primary" sx={{fontWeight: 'bold'}}>
              ${product.price.toFixed(2)}
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          startIcon={<ShoppingCartIcon/>}
          onClick={handleAddToCartClick}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
