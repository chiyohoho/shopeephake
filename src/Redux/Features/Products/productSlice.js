import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API, PRODUCT_ENDPOINT } from '../../../Constant/API'

export const fetchAllProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async () => {
        const response = await axios.get(`${API}/${PRODUCT_ENDPOINT.products}`)
        return response.data.data.products
    },
)

export const fetchDataDetail = createAsyncThunk(
    'products/fetchDataDetail',
    async (productID) => {
        const response = await axios.get(`${API}/${PRODUCT_ENDPOINT.products}/${productID}`)
        return response.data.data
    },
)

const initialState = {
    listProduct: [],
    productDetail: null,
    isLoading: false,
    isError: false,
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.listProduct = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(fetchAllProducts.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })


            .addCase(fetchDataDetail.fulfilled, (state, action) => {
                state.productDetail = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(fetchDataDetail.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
    },
})


export default productSlice.reducer