import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { id } from 'date-fns/locale';

export const getBooks = createAsyncThunk('Product/getBooks', async params => {
	const response = await axios.post('http://localhost:8099/book/data', {});
	const data = await response.data.data;
	// console.log(data)	
	return data;
});

export const getProductFilter = createAsyncThunk('Product/getProductFilter', async params => {
	// console.log(params)
	const response = await axios.post('http://172.20.0.6:8092/SatisfactionProduct/StatusFilter', { end: params[0], start: params[1]  });
	const data = await response.data.data;
	// console.log(data)
	return data;
});

export const createValue = createAsyncThunk('Reworks/createValue', async params => {
	const response = await axios.post('http://172.20.0.6:8092/SatisfactionProduct/create', {
		client: params[0],q1: params[1], q2: params[2], q3: params[3], q4: params[4], comments: params[5]});
	const data = await response.data.data;
	// console.log("Data Create", data)
	// console.log(params)
	return data;
});


const ProductSlice = createSlice({
	name: 'ProductApp',
	initialState: null,
	reducers: {},
	extraReducers: {
		[getProduct.fulfilled]: (state, action) => action.payload
	}
});

export default ProductSlice.reducer;

