import { configureStore } from '@reduxjs/toolkit'
import productReducer from './Features/Products/productSlice'
import userReducer from './Features/User/userSlice'
import authReducer from './Features/Auth/authSlice'
import purchaseReducer from './Features/Purchase/purchaseSlice'

export const store = configureStore({
    reducer: {
        products: productReducer,
        user: userReducer,
        auth: authReducer,
        purchase: purchaseReducer
    },
})