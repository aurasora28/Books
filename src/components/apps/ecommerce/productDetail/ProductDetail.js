import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// MUI Elements
import {
  Box,
  Grid,
  Typography,
  Chip,
  Button,
  Rating,
  Divider,
  Stack,
  useTheme,
  FormLabel,
  TextField,
  Fab,
  ButtonGroup,
} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { IconCheck, IconMinus, IconPlus } from '@tabler/icons';
import { fetchProducts, addNewComment } from '../../../../store/apps/eCommerce/EcommerceSlice';

const ProductDetail = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const Id = useParams();
  const [values, setValues] = React.useState({
    idBook: Id.id,
    comment: { name: 'Anónimo', dateCreated: new Date(), comment: '' },
  });

  // Get Product
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get Products
  const products = useSelector((state) => state.ecommerceReducer.products);
  const product = products.find((product) => product.idBook === parseInt(Id.id));

  const handleSubmit = (e) => {
    e.preventDefault();
    let commentArray = [];
    let commentString = '';

    if (product.comments === null) {
      commentArray.push(values.comment);
    } else {
      commentArray = JSON.parse(product.comments);
      commentArray.push(values.comment);
    }
    commentString = JSON.stringify(commentArray);
    const data = {
      idBook: parseInt(values.idBook),
      comment: commentString
    };
    dispatch(addNewComment(data)).then(() => {
      dispatch(fetchProducts());
      setValues({ idBook: Id.id, comment: { name: 'Anónimo', dateCreated: new Date(), comment: '' } });
    });

  };

  return (
    <Box p={2}>
      {product ? (
        <>
          <Box display="flex" alignItems="center">
            {/* ------------------------------------------- */}
            {/* Badge and category */}
            {/* ------------------------------------------- */}
            <Typography color="textSecondary" variant="h6" ml={1} textTransform="capitalize">
              {product.book}
            </Typography>
            <Typography color="textSecondary" variant="caption" ml={1} mr={1} textTransform="capitalize">
              {product.author}
            </Typography>
            <Chip label={product.year} color="default" size="small" />

          </Box>
          {/* ------------------------------------------- */}
          {/* Title and description */}
          {/* ------------------------------------------- */}
          <Typography fontWeight="600" variant="h4" mt={1}>
            {product.title}
          </Typography>
          <Typography variant="subtitle2" mt={1} mb={2} color={theme.palette.text.secondary}>
            {product.description}
          </Typography>


          <Divider />

          <Typography color="textSecondary" variant="body1" mt={2} mb={2}>
            Comments:
          </Typography>

          {product.comments !== null ?
            <>
              {JSON.parse(product.comments).map((comment, index) => (

                // Renderizar cada comentario aquí
                <div key={index}>

                  <Box display="flex" alignItems="center" mt={1} mb={1}>
                    {/* ------------------------------------------- */}
                    {/* Badge and category */}
                    {/* ------------------------------------------- */}
                    <Typography variant="body1" mr={1} fontWeight={600}>{comment.name} </Typography>
                    <Typography variant="caption">{new Date(comment.dateCreated).toLocaleString()}</Typography>
                  </Box>
                  <Typography variant="body1">{comment.comment}</Typography>

                </div>
              ))}
            </>
            :
            <Typography color="textSecondary" variant="body1" mt={2} mb={2}>
              No Comments yet
            </Typography>
          }

          <Box mt={3} mb={1}>

            <FormLabel >New comment (Max length 100)</FormLabel>
            <TextField
              id="description"
              size="small"
              multiline
              rows="4"
              variant="outlined"
              fullWidth
              value={values.comment.comment}
              onChange={(e) => setValues({ ...values, comment: { ...values.comment, comment: e.target.value } })}
              inputProps={{ maxLength: 100 }}
            />
          </Box>
          <Box textAlign="end" mt={1}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
              type="submit"
              disabled={values.comment.comment.length === 0}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button variant="contained" color="error" onClick={() => setComment('')} disabled={values.comment.comment.length === 0}>
              Cancel
            </Button>
          </Box>
        </>
      ) : (
        'No product'
      )}
    </Box>
  );
};

export default ProductDetail;
