import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API, PRODUCT_ENDPOINT } from '../../../Constant/API'

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params) => {
        const response = await axios.get(`${API}/${PRODUCT_ENDPOINT.products}`, { params })
        return response.data.data
    }
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
    pagination: null,
    defaultUI: false,

    productDetail: null,
    productDetailError: null,

    listProductStatus: null,
    listProductError: false,
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        changeDefaultUIStore: (state, action) => {
            state.defaultUI = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.listProduct = action.payload.products
                state.pagination = action.payload.pagination
                state.listProductStatus = true
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.listProductError = action.payload
                state.listProductStatus = false
            })


            .addCase(fetchDataDetail.fulfilled, (state, action) => {
                state.productDetail = action.payload

            })
            .addCase(fetchDataDetail.rejected, (state, action) => {
                state.productDetailError = action.payload
            })
    },
})


export default productSlice.reducer