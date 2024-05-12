import React, { useEffect } from 'react';
import { filter, orderBy } from 'lodash';
import {
  Box,
  Grid,
  Stack,
  CardContent,
  useMediaQuery,
  Typography,
  Rating,
  Fab,
  Tooltip,
  Button,
  Skeleton,
  CardMedia,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProducts,
  filterReset,
} from '../../../../store/apps/eCommerce/EcommerceSlice';
import ProductSearch from './ProductSearch';
import { IconBasket, IconMenu2 } from '@tabler/icons';
import BlankCard from '../../../shared/BlankCard';

const ProductList = ({ onClick }) => {
  const dispatch = useDispatch();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const getVisibleProduct = (products, sortBy, search) => {
    // SORT BY
    if (sortBy === 'newest') {
      products = orderBy(products, ['idBook'], ['desc']);
    }
    if (sortBy === 'bookDesc') {
      products = orderBy(products, ['book'], ['desc']);
    }
    if (sortBy === 'bookAsc') {
      products = orderBy(products, ['book'], ['asc']);
    }


    //FILTER PRODUCTS BY Search
    if (search !== '') {
      products = products.filter((_product) =>
        _product.book.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      );
    }


    return products;
  };

  const getProducts = useSelector((state) =>
    getVisibleProduct(
      state.ecommerceReducer.products,
      state.ecommerceReducer.sortBy,
      state.ecommerceReducer.productSearch,
    )
  );

  const products = useSelector((state) => state.ecommerceReducer.products);

  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      {/* ------------------------------------------- */}
      {/* Header Detail page */}
      {/* ------------------------------------------- */}
      <Stack direction="row" justifyContent="space-between" pb={3}>
        {lgUp ? (
          <Typography variant="h5">Products</Typography>
        ) : (
          <Fab onClick={onClick} color="primary" size="small">
            <IconMenu2 width="16" />
          </Fab>
        )}
        <Box>
          <ProductSearch />
        </Box>
      </Stack>

      {/* ------------------------------------------- */}
      {/* Page Listing product */}
      {/* ------------------------------------------- */}
      <Grid container spacing={3}>
        {getProducts.length > 0 ? (
          <>
            {getProducts.map((product) => (
              <Grid
                item
                xs={12}
                lg={4}
                md={4}
                sm={6}
                display="flex"
                alignItems="stretch"
                key={product.idBook}
              >
                {/* ------------------------------------------- */}
                {/* Product Card */}
                {/* ------------------------------------------- */}
                <BlankCard className="hoverCard">
                  <Typography component={Link} to={`/apps/ecommerce/detail/${product.idBook}`}>
                    {isLoading || !product.image ? (
                      <>
                        <Skeleton variant="square" width={270} height={300}></Skeleton>
                      </>
                    ) : (
                      <CardMedia
                        component="img"
                        width="100%"
                        image={product.image}
                        alt="products"
                      />
                    )}
                  </Typography>
                  <CardContent sx={{ p: 3, pt: 2 }}>
                    <Typography variant="h6">{product.book}</Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      mt={1}
                    >
                      <Stack direction="row" alignItems="center">
                        <Typography variant="body1">{product.author}</Typography>
                      </Stack>
                      <Typography variant="body1">{product.year}</Typography>
                    </Stack>
                  </CardContent>
                </BlankCard>

                {/* ------------------------------------------- */}
                {/* Product Card */}
                {/* ------------------------------------------- */}
              </Grid>
            ))}
          </>
        ) : (
          <>
            <Grid item xs={12} lg={12} md={12} sm={12}>
              <Box textAlign="center" mt={6}>
                <Typography variant="h2">There is no Book</Typography>
                <Typography variant="h6" mb={3}>
                  The Book you are searching is no longer available.
                </Typography>
                <Button variant="contained" onClick={() => dispatch(fetchProducts())}>
                  Try Again
                </Button>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default ProductList;
