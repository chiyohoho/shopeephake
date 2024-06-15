import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API, USER_ENDPOINT } from '../../../Constant/API'
import { showToast } from '../../../Components/Toast'
import { handleRemoveCart } from '../Purchase/purchaseSlice'

export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await axios.post(`${API}/${USER_ENDPOINT.logout}`, null, {
                headers: {
                    Authorization: localStorage.getItem('USER_A_TOKEN')
                }
            })
            if (res.status == 200) {
                dispatch(handleRemoveCart())
                return res.data.data
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data)
                return rejectWithValue(error.response.data)
            } else {
                console.error('Error:', error.message)
                return rejectWithValue(error.message)
            }
        }
    },
)

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API}/${USER_ENDPOINT.login}`, { email, password })
            return response.data.data
        } catch (err) {
            if (err.response && err.response.status == 422) {
                return rejectWithValue('Email hoặc mật khẩu không đúng')
            } else {
                return rejectWithValue('Đã xảy ra lỗi khi đăng nhập')
            }
        }
    }
)

export const refreshToken = createAsyncThunk(
    'user/refreshToken',
    async (_, { getState }) => {
        const refreshToken = getState().user.userData.refreshToken
        const response = await axios.post(`${API}/${USER_ENDPOINT.refresh}`, {
            refresh_token: refreshToken,
        })
        return response.data.data.access_token
    }
)

const initialState = {
    accessToken: localStorage.getItem('USER_A_TOKEN') || '',
    refreshToken: localStorage.getItem('USER_R_TOKEN') || '',
    loginStatus: false,
    logoutStatus: 'idle',
    loginError: null
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loginStatus = true
                state.accessToken = action.payload.access_token
                state.refreshToken = action.payload.refresh_token
                localStorage.setItem('USER_A_TOKEN', action.payload.access_token)
                localStorage.setItem('USER_R_TOKEN', action.payload.refresh_token)
                showToast('success', 'Đăng nhập thành công')
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loginStatus = false
                state.loginError = action.payload
            })


            .addCase(logoutUser.fulfilled, (state) => {
                state.logoutStatus = false
                state.accessToken = ''
                state.refreshToken = ''
                localStorage.removeItem('USER_A_TOKEN')
                localStorage.removeItem('USER_R_TOKEN')
                showToast('success', 'Đăng xuất thành công')
            })
            .addCase(logoutUser.rejected, (state) => {
                state.logoutStatus = 'failed'
            })

            .addCase(refreshToken.fulfilled, (state, action) => {
                state.accessToken = action.payload
                localStorage.setItem('USER_A_TOKEN', action.payload)
            })
            .addCase(refreshToken.rejected, (state) => {
                state.accessToken = ''
                state.refreshToken = ''
                localStorage.removeItem('USER_A_TOKEN')
                localStorage.removeItem('USER_R_TOKEN')
            })
    },
})

export const { handleLoginStore } = authSlice.actions
export default authSlice.reducer