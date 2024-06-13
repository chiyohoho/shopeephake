import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API, PURCHASE_ENDPOINT, } from '../../../Constant/API';


export const fetchPurchaseData = createAsyncThunk(
    'purchase/fetchPurchaseData',
    async (status, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('USER_A_TOKEN')
            const response = await axios.get(`${API}/${PURCHASE_ENDPOINT.purchases}${status}`, {
                headers: {
                    'Authorization': token,
                },
            })
            return response.data.data

        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data)
            } else if (error.request) {
                return rejectWithValue('Network Error')
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const fetchUserCart = createAsyncThunk(
    'purchase/fetchUserCart',
    async (_, { dispatch }) => {
        const response = await axios.get(`${API}/${PURCHASE_ENDPOINT.purchases}-1`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('USER_A_TOKEN'),
            }
        }, dispatch)
        return response.data.data
    }
)

export const updateCart = createAsyncThunk(
    'purchase/updateCart',
    async (dataCart, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.put(`${API}/purchases/update-purchase`, dataCart, {
                headers: {
                    'Authorization': localStorage.getItem('USER_A_TOKEN'),
                },
            });
            dispatch(fetchUserCart())
            return response.data.data
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data)
                return rejectWithValue(error.response.data)
            } else {
                console.error('Error:', error.message)
                return rejectWithValue(error.message)
            }
        }
    }
)

export const deleteItemInCart = createAsyncThunk(
    'purchase/deleteItemInCart',
    async (dataCart, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API}/purchases`, {
                headers: {
                    'Authorization': localStorage.getItem('USER_A_TOKEN'),
                },
                data: dataCart
            });
            dispatch(fetchUserCart())
            return response.data.data
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data)
                return rejectWithValue(error.response.data)
            } else {
                console.error('Error:', error.message)
                return rejectWithValue(error.message)
            }
        }
    }
)


const initialState = {
    userPurchase: { data: null },
    userCart: { data: null },

    purchaseStatus: 'idle',
    purchaseError: null,

    purchaseCartStatus: 'idle',
    purchaseCartError: null,

    updateCartStatus: 'idle',
    updateCartError: null,

    deleteItemInCartStatus: 'idle',
    deleteItemInCartError: null,
};

export const purchaseSlice = createSlice({
    name: 'purchaseSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPurchaseData.fulfilled, (state, action) => {
                state.purchaseStatus = 'succeeded'
                state.userPurchase.data = action.payload
            })
            .addCase(fetchPurchaseData.rejected, (state, action) => {
                state.purchaseStatus = 'failed'
                state.purchaseError = action.payload
            })

            .addCase(fetchUserCart.fulfilled, (state, action) => {
                state.purchaseStatus = 'succeeded'
                state.userCart.data = action.payload
            })
            .addCase(fetchUserCart.rejected, (state, action) => {
                state.purchaseCartStatus = 'failed'
                state.purchaseCartError = action.payload
            })

            .addCase(updateCart.fulfilled, (state) => {
                state.updateCartStatus = 'succeeded'
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.updateCartStatus = 'failed'
                state.updateCartError = action.payload
            })

            .addCase(deleteItemInCart.fulfilled, (state) => {
                state.deleteItemInCartStatus = 'succeeded'
            })
            .addCase(deleteItemInCart.rejected, (state, action) => {
                state.deleteItemInCartStatus = 'failed'
                state.deleteItemInCartError = action.payload
            })


    },
});

export default purchaseSlice.reducer;
