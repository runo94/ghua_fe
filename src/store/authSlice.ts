import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth/auth.service'
import userService from '../services/user/user.service'

export const asyncLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (payload:any, thunkAPI) => {
    return await authService.login(payload.email, payload.password)
  }
)

export const asyncAuth = createAsyncThunk(
  'auth/fetchProfile',
  async (payload:any, thunkAPI) => {
    return await userService.getProfile(payload)
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    currUser: null
  },
  reducers: {
    logout(state) {
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('accessToken')
      state.isAuth = false
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      // Add user to the state array
      state.isAuth = true
      state.currUser = action.payload.user
    })

    builder.addCase(asyncAuth.fulfilled, (state, action) => {
      // Add user to the state array
      state.isAuth = true
      state.currUser = action.payload
    })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer