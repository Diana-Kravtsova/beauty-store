import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Rating,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Card,
  CardContent,
  Stack,
  Avatar,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CategoryIcon from '@mui/icons-material/Category';
import DeliveryIcon from '@mui/icons-material/LocalShipping';
import WarrantyIcon from '@mui/icons-material/VerifiedUser';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useGetProductByIdQuery } from '../../store/api/productsApi';
import WishlistButton from '../../components/WishlistButton';
import CartButton from '../../components/CartButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({children, value, index, ...other}: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{py: 3}}>{children}</Box>}
    </div>
  );
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const ProductDetails = () => {
  const {id} = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [snackbar, setSnackbar] = useState({open: false, message: ''});

  const {data: product, error, isLoading} = useGetProductByIdQuery(id || '', {
    skip: !id
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress/>
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{mb: 2}}>
          Product not found or error loading data.
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon/>}
          onClick={() => navigate('/products')}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  const discountPrice = product.price * (1 - product.discountPercentage / 100);
  const savings = product.price - discountPrice;

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product?.title || 'Share',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error:', error);
      }
    }

    await navigator.clipboard.writeText(url);
    setSnackbar({open: true, message: 'Link copied to clipboard!'});
  };

  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Calculate average rating from reviews
  const averageReviewRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : product.rating;

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* Left Column - Images */}
        <Grid size={{xs: 12, md: 6}}>
          <Box sx={{position: 'relative'}}>
            {/* Main Image */}
            <Box
              component="img"
              src={product.images[selectedImageIndex]}
              alt={product.title}
              sx={{
                width: '100%',
                height: '400px',
                objectFit: 'contain',
                borderRadius: 2,
                mb: 2,
              }}
            />

            <WishlistButton
              product={{
                id: product.id,
                title: product.title,
                price: discountPrice,
                thumbnail: product.thumbnail
              }}
              size={'large'}
            />

            {/* Discount Badge */}
            {product.discountPercentage > 0 && (
              <Chip
                icon={<LocalOfferIcon/>}
                label={`-${product.discountPercentage}%`}
                color="error"
                sx={{
                  position: 'absolute',
                  top: 56,
                  right: 16,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
              />
            )}

            {/* Availability Status */}
            <Chip
              label={product.availabilityStatus}
              color={
                product.availabilityStatus.toLowerCase().includes('in stock')
                  ? 'success'
                  : product.availabilityStatus.toLowerCase().includes('low stock')
                    ? 'warning'
                    : 'error'
              }
              size="small"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                fontWeight: 'bold',
              }}
            />

            {/* Image Thumbnails */}
            <Stack direction="row" spacing={1} sx={{overflowX: 'auto', py: 1}}>
              {product.images.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  onClick={() => setSelectedImageIndex(index)}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: 'contain',
                    borderRadius: 1,
                    cursor: 'pointer',
                    border: selectedImageIndex === index
                      ? `2px solid ${theme.palette.primary.main}`
                      : '2px solid transparent',
                    opacity: selectedImageIndex === index ? 1 : 0.7,
                    transition: 'all 0.2s',
                    '&:hover': {
                      opacity: 1,
                      borderColor: theme.palette.primary.light,
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid size={{xs: 12, md: 6}}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            {product.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            by {product.brand}
          </Typography>

          {/* Rating and Reviews */}
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <Rating value={averageReviewRating} precision={0.1} readOnly/>
            <Typography variant="body1" fontWeight="medium">
              {averageReviewRating.toFixed(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ({product.reviews.length} reviews)
            </Typography>
            <Divider orientation="vertical" flexItem/>
            <Typography variant="body2" color="text.secondary">
              {product.stock} in stock
            </Typography>
          </Stack>

          {/* Price */}
          <Box mb={3}>
            {product.discountPercentage > 0 ? (
              <>
                <Stack direction="row" alignItems="baseline" spacing={2}>
                  <Typography variant="h3" color="primary" fontWeight="bold">
                    ${discountPrice.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{textDecoration: 'line-through'}}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Chip
                    label={`Save $${savings.toFixed(2)}`}
                    color="success"
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </>
            ) : (
              <Typography variant="h3" color="primary" fontWeight="bold">
                ${product.price.toFixed(2)}
              </Typography>
            )}
          </Box>

          {/* Description */}
          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>

          {/* Quick Details */}
          <Stack spacing={2} mb={3}>
            <Box display="flex" alignItems="center">
              <CategoryIcon color="action" sx={{mr: 1}}/>
              <Typography variant="body2" sx={{mr: 1}}>Category:</Typography>
              <Typography variant="body1" fontWeight="medium">
                {product.category}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <WarrantyIcon color="action" sx={{mr: 1}}/>
              <Typography variant="body2" sx={{mr: 1}}>Warranty:</Typography>
              <Typography variant="body1" fontWeight="medium">
                {product.warrantyInformation}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <DeliveryIcon color="action" sx={{mr: 1}}/>
              <Typography variant="body2" sx={{mr: 1}}>Shipping:</Typography>
              <Typography variant="body1" fontWeight="medium">
                {product.shippingInformation}
              </Typography>
            </Box>
          </Stack>

          {/* Action Buttons */}
          <Stack direction={{xs: 'column', sm: 'row'}} spacing={2} mb={4}>
            {/* Quantity Selector */}
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                border: 1,
                borderColor: theme.palette.primary.main,
                borderRadius: 1,
                flexShrink: 0,
                height: '40px'
              }}
            >
              <IconButton
                size="small"
                onClick={() => {
                  const newQuantity = quantity - 1;
                  if (newQuantity < 1) return;
                  setQuantity(newQuantity);
                }}
                sx={{minWidth: '40px', height: '40px'}}
                disabled={quantity <= 1}
              >
                <RemoveIcon fontSize="small"/>
              </IconButton>
              <Typography sx={{width: '40px', textAlign: 'center'}}>
                {quantity}
              </Typography>
              <IconButton
                size="small"
                onClick={() => {
                  const newQuantity = quantity + 1;
                  if (product && newQuantity > product.stock) {
                    setSnackbar({
                      open: true,
                      message: `Maximum available: ${product.stock}`
                    });
                    return;
                  }
                  setQuantity(newQuantity);
                }}
                sx={{minWidth: '40px', height: '40px'}}
              >
                <AddIcon fontSize="small"/>
              </IconButton>
            </Stack>

            <CartButton
              product={{
                id: product.id,
                title: product.title,
                price: discountPrice,
                thumbnail: product.thumbnail,
                quantity: quantity
              }}
              variant="contained"
              fullWidth
            />
          </Stack>

          <Stack direction="row" spacing={1} mb={3}>
            <Button
              variant="outlined"
              startIcon={<ShareIcon/>}
              onClick={handleShare}
            >
              Share
            </Button>
            <Snackbar
              open={snackbar.open}
              autoHideDuration={3000}
              onClose={() => setSnackbar({...snackbar, open: false})}
            >
              <Alert>
                {snackbar.message}
              </Alert>
            </Snackbar>
          </Stack>

          <Alert severity="info" icon={false} sx={{mb: 2}}>
            <Stack direction="row" spacing={1} alignItems="center">
              <DeliveryIcon/>
              <Typography variant="body2">
                Free shipping on orders over $50 • Delivery in 2-3 days
              </Typography>
            </Stack>
          </Alert>
        </Grid>
      </Grid>

      {/* Product Tabs */}
      <Box sx={{mt: 6}}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="product tabs"
          sx={{borderBottom: 1, borderColor: 'divider'}}
        >
          <Tab label="Description"/>
          <Tab label={`Reviews (${product.reviews.length})`}/>
          <Tab label="Shipping & Warranty"/>
          <Tab label="Details"/>
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="body1">
            {product.description}
          </Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid size={{xs: 12, md: 4}}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Customer Reviews</Typography>
                  <Box textAlign="center" py={2}>
                    <Typography variant="h2" color="primary">
                      {averageReviewRating.toFixed(1)}
                    </Typography>
                    <Rating value={averageReviewRating} precision={0.1} readOnly size="large"/>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      Based on {product.reviews.length} reviews
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{xs: 12, md: 8}}>
              {product.reviews.length > 0 ? (
                <Stack spacing={2}>
                  {product.reviews.map((review, index) => (
                    <Paper key={index} variant="outlined" sx={{p: 2}}>
                      <Stack spacing={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Avatar>
                              <PersonIcon/>
                            </Avatar>
                            <Typography variant="subtitle1" fontWeight="medium">
                              {review.reviewerName}
                            </Typography>
                          </Stack>
                          <Typography variant="caption" color="text.secondary">
                            <CalendarTodayIcon fontSize="small" sx={{verticalAlign: 'middle', mr: 0.5}}/>
                            {formatDate(review.date)}
                          </Typography>
                        </Stack>

                        <Rating value={review.rating} readOnly size="small"/>

                        <Typography variant="body2">
                          {review.comment}
                        </Typography>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              ) : (
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="body1" textAlign="center" py={3}>
                      No reviews yet. Be the first to review this product!
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid size={{xs: 12, md: 6}}>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <DeliveryIcon color="primary"/>
                    <Typography variant="h6">Shipping Information</Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">
                    {product.shippingInformation}
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body1">
                      • Free shipping on orders over $50
                    </Typography>
                    <Typography variant="body1">
                      • Standard shipping: 2-3 business days
                    </Typography>
                    <Typography variant="body1">
                      • Express shipping: 1 business day ($9.99)
                    </Typography>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid size={{xs: 12, md: 6}}>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <WarrantyIcon color="primary"/>
                    <Typography variant="h6">Warranty & Returns</Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">
                    {product.warrantyInformation}
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body1">
                      • 30-day return policy
                    </Typography>
                    <Typography variant="body1">
                      • Product must be in original packaging
                    </Typography>
                    <Typography variant="body1">
                      • Free returns for damaged items
                    </Typography>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>Product Details</Typography>
              <Grid container spacing={3}>
                <Grid size={{xs: 12, md: 6}}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Brand:</Typography>
                      <Typography variant="body1" fontWeight="medium">{product.brand}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Category:</Typography>
                      <Typography variant="body1" fontWeight="medium">{product.category}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Availability:</Typography>
                      <Typography variant="body1" fontWeight="medium">{product.availabilityStatus}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Stock:</Typography>
                      <Typography variant="body1" fontWeight="medium">{product.stock} units</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Rating:</Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Rating value={product.rating} precision={0.1} readOnly size="small"/>
                        <Typography variant="body1" fontWeight="medium">{product.rating.toFixed(1)}</Typography>
                      </Stack>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Discount:</Typography>
                      <Typography variant="body1" fontWeight="medium">{product.discountPercentage}%</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Product ID:</Typography>
                      <Typography variant="body1" fontWeight="medium">{product.id}</Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default ProductDetails;
