import { combineReducers } from '@reduxjs/toolkit';
import product from './ProductSlice';

const reducer = combineReducers({
	product
});

export default reducer;
