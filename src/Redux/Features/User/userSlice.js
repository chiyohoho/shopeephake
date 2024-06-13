import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API, USER_ENDPOINT } from '../../../Constant/API';
import { showToast } from '../../../Components/Toast';

const refreshToken = async () => {
    try {
        const response = await axios.post(`${API}/${USER_ENDPOINT.refreshToken}`, null, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('USER_R_TOKEN')}`
            }
        });
        const newAccessToken = response.data.accessToken
        localStorage.setItem('USER_A_TOKEN', newAccessToken)
        return newAccessToken
    } catch (error) {
        throw new Error('Không thể làm mới token')
    }
};

const fetchWithRefresh = async (url, options) => {
    try {
        const response = await axios(url, options)
        return response
    } catch (error) {
        if (error.response && error.response.status === 401) {
            const newToken = await refreshToken()
            options.headers['Authorization'] = newToken
            const retryResponse = await axios(url, options)
            return retryResponse
        } else {
            throw error
        }
    }
};

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (_, { dispatch }) => {
        const response = await fetchWithRefresh(`${API}/${USER_ENDPOINT.me}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('USER_A_TOKEN'),
                'Content-Type': 'application/json'
            }
        }, dispatch)
        return response.data.data
    }
)

export const uploadNewAvatar = createAsyncThunk(
    'user/uploadNewAvatar',
    async (avatarFile, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('USER_A_TOKEN')
            const formData = new FormData()
            formData.append('image', avatarFile[0])

            const response = await axios.post(`${API}/user/upload-avatar`, formData, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data'
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

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (updatedData, { rejectWithValue, dispatch }) => {
        try {
            const token = localStorage.getItem('USER_A_TOKEN');

            const formattedData = {
                name: updatedData.name,
                phone: updatedData.phone,
                address: updatedData.address,
                date_of_birth: updatedData.date_of_birth,
                avatar: updatedData.avatar
            };

            const response = await fetchWithRefresh(`${API}/${USER_ENDPOINT.me}`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                data: formattedData
            }, dispatch)

            dispatch(fetchUserData())

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

export const changePassword = createAsyncThunk(
    'user/changePassword',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const token = localStorage.getItem('USER_A_TOKEN');

            const formattedData = {
                password: data.currentPassword,
                new_password: data.newPassword,
            }

            const response = await fetchWithRefresh(`${API}/${USER_ENDPOINT.me}`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                data: formattedData
            }, dispatch)

            dispatch(fetchUserData())

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

const initialState = {
    user: { data: null },
    userStatus: 'idle',

    updateUserStatus: 'idle',
    updateUserError: null,

    updateAvatarStatus: 'idle',
    updateAvatarError: null,

    changePasswordStatus: 'idle',
    changePasswordError: null,

};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.userStatus = 'success';
                state.user.data = action.payload;
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.userStatus = 'failed';
            })

            .addCase(updateUser.fulfilled, (state, action) => {
                state.updateUserStatus = 'succeeded';
                state.user.data = action.payload;
                showToast('success', 'Đã cập nhật thông tin thành công!');
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.updateUserStatus = 'failed';
                state.updateUserError = action.payload;
            })

            .addCase(uploadNewAvatar.fulfilled, (state) => {
                state.updateAvatarStatus = 'succeeded'
            })
            .addCase(uploadNewAvatar.rejected, (state, action) => {
                state.updateAvatarStatus = 'failed'
                state.updateAvatarError = action.payload
            })

            .addCase(changePassword.fulfilled, (state) => {
                state.changePasswordStatus = 'succeeded'
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.changePasswordStatus = 'failed'
                state.changePasswordError = action.payload
            })
    },
});

export default userSlice.reducer;
