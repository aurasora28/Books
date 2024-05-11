import axios from '../../../utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

const API_URL = '/api/data/eCommerce/ProductsData';

const initialState = {
  products: [],
  productSearch: '',
  sortBy: 'newest',
  error: ''
};

export const EcommerceSlice = createSlice({
  name: 'ecommerce',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    // GET PRODUCTS
    getProducts: (state, action) => {
      state.products = action.payload;
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
    addNewBookSuccess(state, action) {
      state.products.push(action.payload);
    },
    addNewBookFailure(state, action) {
      state.error = action.payload;
    },
    addNewCommentSuccess(state, action) {
      state.products.push(action.payload);
    },
    addNewCommentFailure(state, action) {
      state.error = action.payload;
    },
  },
});
export const {
  hasError,
  getProducts,
  SearchProduct,
  setVisibilityFilter,
  sortByProducts,
  filterProducts,
  filterReset,
  addNewBookSuccess, 
  addNewBookFailure,
  addNewCommentSuccess, 
  addNewCommentFailure
  
} = EcommerceSlice.actions;

export const addNewBook = (newBookData) => async (dispatch) => {
  try {
    const response = await axios.post(`http://localhost:8099/book/create`, {title: newBookData.title,author: newBookData.author, year: newBookData.year, description: newBookData.description});

   dispatch(addNewBookSuccess(response.data));
  } catch (error) {
    dispatch(addNewBookFailure(error.message));
  }
};

export const addNewComment = (newCommentData) => async (dispatch) => {
  try {
    console.log("COMENTAROS", newCommentData)
    const response = await axios.post(`http://localhost:8099/book/updateComment`, {idBook: newCommentData.idBook, comments: newCommentData.comment});
    console.log(response)
   dispatch(addNewCommentSuccess(response.data));
  } catch (error) {
    dispatch(addNewCommentFailure(error.message));
  }
};

export const fetchProducts = () => async (dispatch) => {
  try {
    //const response = await axios.get(`${API_URL}`);
    const responseBooks = await axios.get(`http://localhost:8099/book/data`);

    dispatch(getProducts(responseBooks.data.data));
    console.log(responseBooks.data.data);
  } catch (error) {
    dispatch(hasError(error));
  }
};

export default EcommerceSlice.reducer;
