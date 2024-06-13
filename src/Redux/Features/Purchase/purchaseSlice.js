import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API, PURCHASE_ENDPOINT, } from '../../../Constant/API';


export const fetchPurchaseData = createAsyncThunk(
    'user/fetchPurchaseData',
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
    'user/fetchUserCart',
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


const initialState = {
    userPurchase: { data: null },
    userCart: { data: null },

    purchaseStatus: 'idle',
    purchaseError: null,

    purchaseCartStatus: 'idle',
    purchaseCartError: null,
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


    },
});

export default purchaseSlice.reducer;
