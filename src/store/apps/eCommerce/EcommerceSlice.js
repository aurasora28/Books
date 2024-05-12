import axios from '../../../utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = '/api/data/eCommerce/ProductsData';

export const fetchProducts = createAsyncThunk('Ruteo/GetDestinos', async () => {
  try {
    const response = await axios.post('http://localhost:8099/book/data', {});
    const data = await response.data.data;
    return data;
  } catch (err) {
    throw err;
  }
});

const initialState = {
  products: [],
  productSearch: '',
  sortBy: 'newest',
  error: false,
  isLoading: true
};

export const EcommerceSlice = createSlice({
  name: 'ecommerce',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    SearchProduct: (state, action) => {
      state.productSearch = action.payload;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    //  SORT  PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },
    //  FILTER Reset
    filterReset(state) {
      state.sortBy = 'newest';
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [fetchProducts.pending]: (state, action) => { state.error = false },
    [fetchProducts.error]: (state, action) => { state.error = true }

  }
});
export const {
  hasError,
  SearchProduct,
  setVisibilityFilter,
  sortByProducts,
  filterProducts,
  filterReset,
} = EcommerceSlice.actions;

export const addNewBook = (newBookData) => async (dispatch) => {
  try {
    const response = await axios.post(`http://localhost:8099/book/create`, { title: newBookData.title, author: newBookData.author, year: newBookData.year, description: newBookData.description, image: newBookData.image });
  } catch (error) {
    throw error;
  }
};

export const addNewComment = (newCommentData) => async (dispatch) => {
  try {
    const response = await axios.post(`http://localhost:8099/book/updateComment`, { idBook: newCommentData.idBook, comments: newCommentData.comment });
  } catch (error) {
    throw error;
  }
};


export default EcommerceSlice.reducer;

