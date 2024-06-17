import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API, PRODUCT_ENDPOINT } from '../../../Constant/API'

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params) => {
        if (params && params.length > 0) {
            const response = await axios.get(`${API}/${PRODUCT_ENDPOINT.products}/${params}`)
            return response.data.data;
        } else {
            const response = await axios.get(`${API}/${PRODUCT_ENDPOINT.products}/?page=1&limit=20`,)
            return response.data.data;
        }
    }
)

export const fetchDataDetail = createAsyncThunk(
    'products/fetchDataDetail',
    async (productID) => {
        const response = await axios.get(`${API}/${PRODUCT_ENDPOINT.products}/${productID}`)
        return response.data.data
    },
)

export const fetchDataCategories = createAsyncThunk(
    'products/fetchDataCategories',
    async () => {
        const response = await axios.get(`${API}/${PRODUCT_ENDPOINT.categories}`)
        return response.data.data
    },
)

const initialState = {
    listProduct: [],
    listCategories: [],
    pagination: null,

    listProductStatus: null,
    listProductError: false,

    listCategoriesStatus: null,
    listCategoriesError: false,
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

            .addCase(fetchDataCategories.fulfilled, (state, action) => {
                state.listCategories = action.payload
                state.listCategoriesStatus = 'success'

            })
            .addCase(fetchDataCategories.rejected, (state, action) => {
                state.listCategoriesError = action.payload
                state.listCategoriesStatus = 'error'
            })
    },
})


export default productSlice.reducer